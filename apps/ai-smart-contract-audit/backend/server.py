from flask import Flask, request, jsonify
import subprocess
import openai
import os
import json
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/analyze": {"origins": "http://localhost:3000"}})

# Set your OpenAI API key
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

@app.route('/analyze', methods=['POST'])
def analyze():
    """Handles file uploads or pasted Solidity code, runs Slither, and returns results."""
    print("📩 Incoming Request!")  # ✅ Log request arrival
    print("🔍 Request Headers:", request.headers)  # ✅ Log request headers

    contract_code = request.form.get("code")
    file = request.files.get("file")

    if file:
        print(f"📂 Received File: {file.filename}, Size: {file.content_length} bytes")  # ✅ Log file details
        contract_path = f"temp/{file.filename}"
        file.save(contract_path)
    elif contract_code:
        print("📝 Received Solidity Code")  # ✅ Log received Solidity code
        contract_path = "temp/temp.sol"
        with open(contract_path, "w") as f:
            f.write(contract_code)
    else:
        print("❌ No contract provided!")
        return jsonify({"error": "No contract provided."}), 400

    # ✅ Run Slither and get output
    vulnerabilities = run_slither(contract_path)

    print("\n===== SECURITY REPORT =====")
    print(vulnerabilities)

    print("\n===== AI-Powered Explanations =====")
    print(explain_with_ai(vulnerabilities))

    # ✅ Delete temp file after processing
    os.remove(contract_path)

    return jsonify({"analysis": explain_with_ai(vulnerabilities)})

if __name__ == '__main__':
    os.makedirs("temp", exist_ok=True)
    app.run(debug=True, host="0.0.0.0", port=5001)  # ✅ Allow external connections
