import subprocess
import argparse
import openai
import json
import os

# OpenAI API Key
client = openai.OpenAI(api_key="")
SLITHER_PATH = "/venv/bin/slither"  # Change this to your Slither path

def run_slither(contract_path):
    """Runs Slither on a Solidity contract and extracts vulnerabilities with line numbers."""
    json_output_file = "slither_output.json"

    # ✅ Delete old JSON file before running
    if os.path.exists(json_output_file):
        os.remove(json_output_file)

    try:
        print(f"🔍 Running Slither on: {contract_path}")

        # ✅ Run Slither with JSON output
        result = subprocess.run(
            [SLITHER_PATH, contract_path, "--json", json_output_file, "--solc", "solc"],
            capture_output=True, text=True
        )

        # ✅ Log stdout & stderr for debugging
        print("\n🔍 Slither Output (stdout):", result.stdout)
        print("\n⚠️ Slither Errors (stderr):", result.stderr)

        # ✅ Check for real failure (if return code != 0 AND no JSON output is generated)
        if result.returncode != 0 and not os.path.exists(json_output_file):
            return [{"error": f"❌ Slither failed: {result.stderr.strip()}"}]

        # ✅ If warnings are in stderr but JSON output exists, assume success
        if not os.path.exists(json_output_file):
            return [{"error": "❌ Slither JSON output file was not generated!"}]

        # ✅ Read and parse JSON output
        with open(json_output_file, "r") as f:
            slither_output = json.load(f)

        os.remove(json_output_file)  # ✅ Clean up after reading

        # ✅ Extract vulnerabilities
        vulnerabilities = []
        if "results" in slither_output and "detectors" in slither_output["results"]:
            for issue in slither_output["results"]["detectors"]:
                vuln_data = {
                    "check": issue.get("check", "Unknown Check"),  # Vulnerability type
                    "description": issue.get("description", "No description provided"),  
                    "impact": issue.get("impact", "Unknown"),  # High/Medium/Low
                    "line": issue["source_mapping"].get("lines", "Unknown") if "source_mapping" in issue else "Unknown",
                }
                vulnerabilities.append(vuln_data)

        return vulnerabilities if vulnerabilities else [{"message": "✅ No vulnerabilities found!"}]

    except Exception as e:
        return [{"error": f"Error running Slither: {e}"}]



def explain_with_ai(vulnerabilities):
    """Uses AI to explain vulnerabilities and suggest fixes."""
    try:
        # ✅ Ensure vulnerabilities exist
        if not vulnerabilities or isinstance(vulnerabilities, str):
            return "No vulnerabilities detected or invalid Slither output."

        # ✅ Format vulnerabilities into readable text for AI
        ai_prompt = "Explain the following Solidity vulnerabilities and suggest fixes:\n\n"
        for vuln in vulnerabilities:
            if "error" in vuln:
                return vuln["error"]
            
            ai_prompt += (
                f"🔹 **Vulnerability:** {vuln.get('check', 'Unknown')}\n"
                f"📌 **Description:** {vuln.get('description', 'No details available')}\n"
                f"⚠️ **Impact:** {vuln.get('impact', 'Unknown')}\n"
                f"📍 **Line(s):** {vuln.get('line', 'Unknown')}\n\n"
                f"💡 **Suggested Fix:**\n\n"
            )

        # ✅ Send to AI for suggestions
        response = client.chat.completions.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": "You are an expert Solidity security auditor."},
                {"role": "user", "content": ai_prompt}
            ]
        )

        return response.choices[0].message.content

    except Exception as e:
        return f"Error fetching AI explanation: {e}"


def main():
    parser = argparse.ArgumentParser(description="Smart Contract Security Scanner with AI")
    parser.add_argument("contract", help="Path to Solidity contract")
    args = parser.parse_args()

    print("\n🔍 Running Solidity Security Scan...")
    vulnerabilities = run_slither(args.contract)

    print("\n===== SECURITY REPORT =====")
    print(vulnerabilities)

    print("\n===== AI-Powered Explanations =====")
    print(explain_with_ai(vulnerabilities))

if __name__ == "__main__":
    main()
