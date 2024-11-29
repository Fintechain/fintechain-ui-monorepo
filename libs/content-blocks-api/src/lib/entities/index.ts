/**
 * @file entities.ts
 * TypeORM entity definitions for persisting content blocks.
 * These entities map our domain model to the database structure.
 */

import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    OneToMany,
    Tree,
    TreeChildren,
    TreeParent,
    Index
} from 'typeorm';
import { 
    BlockType, 
    BlockContent, 
    BlockTypeProps,
    BlockVersion as IBlockVersion,
    BlockReference as IBlockReference
} from '@fintechain-monorepo/content-blocks';

/**
 * Main entity for content blocks.
 * Uses TypeORM's tree pattern for hierarchical data storage.
 */
@Entity('content_blocks')
@Tree('materialized-path')
@Index(['workspace', 'environment'])
@Index(['workspace', 'type'])
@Index(['workspace', 'tags'])
export class ContentBlockEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({
        type: 'enum',
        enum: BlockType
    })
    type!: BlockType;

    @Column('jsonb')
    properties!: BlockTypeProps[keyof BlockTypeProps];

    @TreeChildren()
    children!: ContentBlockEntity[];

    @TreeParent()
    parent!: ContentBlockEntity;

    @Column()
    @Index()
    workspace!: string;

    @Column({
        type: 'enum',
        enum: ['draft', 'published']
    })
    environment!: 'draft' | 'published';

    @Column('simple-array', { nullable: true })
    tags?: string[];

    @Column({ nullable: true })
    locale?: string;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @Column()
    createdBy!: string;

    @Column()
    updatedBy!: string;

    @Column({ default: 1 })
    version!: number;

    /**
     * Converts the entity to a domain model object
     */
    toDomain(): BlockContent<any> {
        return {
            id: this.id,
            type: this.type,
            properties: this.properties,
            children: this.children?.map(child => child.toDomain()),
            parent: this.parent ? {
                id: this.parent.id,
                type: this.parent.type
            } : undefined,
            metadata: {
                createdAt: this.createdAt.toISOString(),
                updatedAt: this.updatedAt.toISOString(),
                createdBy: this.createdBy,
                updatedBy: this.updatedBy,
                version: this.version,
                workspace: this.workspace,
                environment: this.environment,
                tags: this.tags,
                locale: this.locale
            }
        };
    }

    /**
     * Creates an entity from a domain model object
     */
    static fromDomain(block: BlockContent<any>): ContentBlockEntity {
        const entity = new ContentBlockEntity();
        entity.id = block.id;
        entity.type = block.type;
        entity.properties = block.properties;
        entity.createdBy = block.metadata.createdBy;
        entity.updatedBy = block.metadata.updatedBy;
        entity.version = block.metadata.version;
        entity.workspace = block.metadata.workspace;
        entity.environment = block.metadata.environment;
        entity.tags = block.metadata.tags;
        entity.locale = block.metadata.locale;
        return entity;
    }
}

/**
 * Entity for storing block versions
 */
@Entity('block_versions')
@Index(['blockId', 'version'], { unique: true })
export class BlockVersionEntity implements Omit<IBlockVersion<any>, 'content'> {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column()
    blockId!: string;

    @Column()
    version!: number;

    @Column('jsonb')
    content!: BlockContent<any>;

    @CreateDateColumn()
    createdAt!: Date;

    @Column()
    createdBy!: string;

    @Column({ nullable: true })
    comment?: string;

    @Column()
    workspace!: string;

    @ManyToOne(() => ContentBlockEntity)
    block!: ContentBlockEntity;
}

/**
 * Entity for storing block references
 */
@Entity('block_references')
export class BlockReferenceEntity implements Omit<IBlockReference, 'metadata'> {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({
        type: 'enum',
        enum: ['reference', 'copy']
    })
    type!: 'reference' | 'copy';

    @Column()
    sourceId!: string;

    @Column()
    sourceVersion!: number;

    @CreateDateColumn()
    createdAt!: Date;

    @Column()
    createdBy!: string;

    @Column()
    workspace!: string;

    @ManyToOne(() => ContentBlockEntity)
    source!: ContentBlockEntity;
}