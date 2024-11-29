/**
 * @file repository.ts
 * Repository implementation for content block operations.
 * Handles data access and persistence logic.
 */

import { Injectable } from '@tsed/di';
import { 
    Repository,
    TreeRepository,
    DataSource,
    IsNull,
    Like,
    Between
} from 'typeorm';

import { 
    ContentBlockEntity,
    BlockVersionEntity,
    BlockReferenceEntity
} from '../entities';

import {
    BlockContent,
    BlockQuery,
    BlockVersion,
    BlockReference,
    BlockType,
    BlockListResult
} from '@fintechain-monorepo/content-blocks';
import { randomUUID } from 'crypto';
import { BlockTypeProps } from '@fintechain-monorepo/content-blocks';

/**
 * Repository for managing content blocks and related entities.
 * Provides high-level operations for working with content blocks.
 */
@Injectable()
export class ContentBlockRepository {
    private blockRepo: TreeRepository<ContentBlockEntity>;
    private versionRepo: Repository<BlockVersionEntity>;
    private referenceRepo: Repository<BlockReferenceEntity>;

    constructor(dataSource: DataSource) {
        this.blockRepo = dataSource.getTreeRepository(ContentBlockEntity);
        this.versionRepo = dataSource.getRepository(BlockVersionEntity);
        this.referenceRepo = dataSource.getRepository(BlockReferenceEntity);
    }

    /**
     * Finds a block by its ID
     */
    async findById(id: string): Promise<BlockContent<any> | undefined> {
        const entity = await this.blockRepo.findOne({ where: { id } });
        return entity?.toDomain();
    }

    /**
     * Creates a new content block
     */
    async create<T extends keyof BlockTypeProps>(
        block: Omit<BlockContent<T>, 'id' | 'metadata'> & { 
            workspace: string; 
            createdBy: string 
        }
    ): Promise<BlockContent<T>> {
        const entity = ContentBlockEntity.fromDomain({
            ...block,
            id: randomUUID(),
            metadata: {
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                createdBy: block.createdBy,
                updatedBy: block.createdBy,
                version: 1,
                workspace: block.workspace,
                environment: 'draft'
            }
        } as BlockContent<T>);

        await this.blockRepo.manager.transaction(async manager => {
            const savedEntity = await manager.save(entity);
            
            // Create initial version
            const version = new BlockVersionEntity();
            version.blockId = savedEntity.id;
            version.version = 1;
            version.content = savedEntity.toDomain();
            version.createdBy = block.createdBy;
            version.workspace = block.workspace;
            await manager.save(version);
        });

        const saved = await this.blockRepo.findOne({ where: { id: entity.id } });
        return saved!.toDomain() as BlockContent<T>;
    }

    /**
     * Updates an existing content block
     */
    async update<T extends keyof BlockTypeProps>(
        id: string,
        updates: Partial<BlockContent<T>>,
        userId: string,
        comment?: string
    ): Promise<BlockContent<T>> {
        return this.blockRepo.manager.transaction(async manager => {
            const entity = await this.blockRepo.findOneOrFail({ where: { id } });
            const updatedEntity = this.blockRepo.merge(entity, {
                ...ContentBlockEntity.fromDomain({
                    ...entity.toDomain(),
                    ...updates,
                    metadata: {
                        ...entity.toDomain().metadata,
                        updatedAt: new Date().toISOString(),
                        updatedBy: userId,
                        version: entity.version + 1
                    }
                }),
            });

            const saved = await manager.save(updatedEntity);

            // Create new version
            const version = new BlockVersionEntity();
            version.blockId = saved.id;
            version.version = saved.version;
            version.content = saved.toDomain();
            version.createdBy = userId;
            version.workspace = saved.workspace;
            version.comment = comment;
            await manager.save(version);

            return saved.toDomain() as BlockContent<T>;
        });
    }

    /**
     * Finds blocks based on query parameters
     */
    async findBlocks(query: BlockQuery): Promise<BlockListResult> {
        const qb = this.blockRepo.createQueryBuilder('block')
            .where('block.workspace = :workspace', { workspace: query.workspace });

        // Apply filters
        if (query.environment) {
            qb.andWhere('block.environment = :environment', { environment: query.environment });
        }

        if (query.type?.length) {
            qb.andWhere('block.type IN (:...types)', { types: query.type });
        }

        if (query.tags?.length) {
            qb.andWhere('block.tags && ARRAY[:...tags]', { tags: query.tags });
        }

        if (query.locale) {
            qb.andWhere('block.locale = :locale', { locale: query.locale });
        }

        if (query.createdBy) {
            qb.andWhere('block.createdBy = :createdBy', { createdBy: query.createdBy });
        }

        if (query.createdAfter) {
            qb.andWhere('block.createdAt >= :createdAfter', { createdAfter: new Date(query.createdAfter) });
        }

        if (query.createdBefore) {
            qb.andWhere('block.createdAt <= :createdBefore', { createdBefore: new Date(query.createdBefore) });
        }

        if (query.fullText) {
            qb.andWhere('block.properties::text ILIKE :search', { search: `%${query.fullText}%` });
        }

        // Add sorting
        if (query.sort) {
            qb.orderBy(`block.${query.sort.field}`, query.sort.order.toUpperCase() as 'ASC' | 'DESC');
        } else {
            qb.orderBy('block.createdAt', 'DESC');
        }

        // Add pagination
        const page = query.page || 1;
        const limit = query.limit || 10;
        const [items, total] = await qb
            .skip((page - 1) * limit)
            .take(limit)
            .getManyAndCount();

        return {
            items: items.map(item => item.toDomain()),
            total,
            page,
            limit,
            hasMore: total > page * limit
        };
    }

    /**
     * Gets the full version history of a block
     */
    async getVersionHistory(blockId: string): Promise<BlockVersion<any>[]> {
        const versions = await this.versionRepo.find({
            where: { blockId },
            order: { version: 'DESC' }
        });

        return versions.map(version => ({
            blockId: version.blockId,
            version: version.version,
            content: version.content,
            metadata: {
                createdAt: version.createdAt.toISOString(),
                createdBy: version.createdBy,
                comment: version.comment,
                workspace: version.workspace
            }
        }));
    }

    /**
     * Creates a reference to another block
     */
    async createReference(
        sourceId: string,
        type: 'reference' | 'copy',
        userId: string
    ): Promise<BlockReference> {
        const source = await this.blockRepo.findOneOrFail({ where: { id: sourceId } });

        const reference = new BlockReferenceEntity();
        reference.type = type;
        reference.sourceId = sourceId;
        reference.sourceVersion = source.version;
        reference.createdBy = userId;
        reference.workspace = source.workspace;
        reference.source = source;

        const saved = await this.referenceRepo.save(reference);

        return {
            id: saved.id,
            type: saved.type,
            sourceId: saved.sourceId,
            sourceVersion: saved.sourceVersion,
            metadata: {
                createdAt: saved.createdAt.toISOString(),
                createdBy: saved.createdBy,
                workspace: saved.workspace
            }
        };
    }

    /**
     * Gets the full tree structure of a block
     */
    async getBlockTree(rootId: string): Promise<BlockContent<any>> {
        const tree = await this.blockRepo.findDescendantsTree(
            await this.blockRepo.findOneOrFail({ where: { id: rootId } })
        );
        return tree.toDomain();
    }

    /**
     * Deletes a block and its versions
     */
    async deleteBlock(id: string): Promise<void> {
        await this.blockRepo.manager.transaction(async manager => {
            await manager.delete(BlockVersionEntity, { blockId: id });
            await manager.delete(BlockReferenceEntity, { sourceId: id });
            await manager.delete(ContentBlockEntity, { id });
        });
    }
}