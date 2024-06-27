/**
 * Typescript types for crate-manager.js and profile-manager.js from the crate builder Vue library
 */
declare module 'describo-internals' {
  type Entity = {
    "@id": string;
    "@type": string | string[];
    [key: string]: any;
  };

  type Profile = {
    layouts?: Layout[];
    propertyAssociations?: PropertyAssociation[];
    classes?: { [key: string]: ProfileClass };
    localisation?: { [key: string]: string };
  };

  type Layout = {
    appliesTo: string[];
    about?: Placeholder;
    overflow?: Placeholder;
    [key: string]: any;
  };

  type Placeholder = {
    name: string;
    label: string;
    inputs: any[];
    order: number;
  };

  type PropertyAssociation = {
    property: string;
    inverse: { property: string; propertyId?: string };
    propertyId?: string;
  };

  type ProfileClass = {
    subClassOf?: string[];
    inputs?: any[];
    definition?: "inherit" | "override";
  };

  export class ProfileManager {
    profile: Profile;

    constructor({ profile }: { profile: Profile });

    getLayout({ entity }: { entity: Entity }): Layout | null;

    getPropertyAssociations(): { [key: string]: { property: string; propertyId?: string } };

    getClasses(): string[];

    getEntityTypeHierarchy({ entity }: { entity: Entity }): string[];

    getPropertyDefinition({
                            property,
                            entity,
                          }: {
      property: string;
      entity: Entity;
    }): { propertyDefinition: any };

    mapTypeHierarchies({ types }: { types: string[] }): string[];

    getInputsFromProfile({ entity }: { entity: Entity }): any[];

    getAllInputs({ entity }: { entity: Entity }): { inputs: any[] };

    getTypeDefinition({ entity }: { entity: Entity }): "inherit" | "override";

    getTypeLabel(type: string): string;
  }

  type Crate = {
    "@context": any;
    "@graph": Entity[];
  };

  type CrateManagerParams = {
    crate: Crate;
    pm?: ProfileManager;
    context?: any;
    entityTimestamps?: boolean;
  };

  export class CrateManager {
    crate: Crate | undefined;
    pm: ProfileManager | undefined;
    reverse: { [key: string]: any };
    graphLength: number | undefined;
    rootDescriptor: Entity | undefined;
    rootDataset: Entity | undefined;
    entityIdIndex: { [key: string]: number };
    providedContext: any;
    contextDefinitions: any;
    localContext: any;
    entityTypes: { [key: string]: number };
    entityTimestamps: boolean;
    blankNodes: string[];
    coreProperties: string[];
    errors: any;
    warnings: any;

    constructor({
                  crate,
                  pm,
                  context,
                  entityTimestamps,
                }: CrateManagerParams);

    getContext(): any;

    setContext(context: any): void;

    setProfileManager(pm: ProfileManager): void;

    getRootDataset(): Entity;

    getEntity({
                id,
                stub,
                link,
                materialise,
              }: {
      id: string;
      stub?: boolean;
      link?: boolean;
      materialise?: boolean;
    }): Entity | undefined;

    getEntityTypes(): string[];

    getEntities(params: {
      limit?: number;
      query?: string;
      type?: string;
    }): Generator<Entity, void, unknown>;

    locateEntity({
                   entityIds,
                   strict,
                 }: {
      entityIds: string[];
      strict?: boolean;
    }): Entity[] | undefined;

    resolveLinkedEntityAssociations({
                                      entity,
                                      profile,
                                    }: {
      entity: Entity;
      profile: any;
    }): any[];

    addEntity(entity: Entity): Entity;

    addBlankNode(type: string): Entity;

    addFileOrFolder({
                      path,
                      type,
                    }: {
      path: string;
      type: "File" | "Dataset";
    }): Entity;

    addFile(path: string): Entity;

    addFolder(path: string): Entity;

    deleteEntity({ id }: { id: string }): boolean;

    setProperty({
                  id,
                  property,
                  propertyId,
                  value,
                }: {
      id: string;
      property: string;
      propertyId?: string;
      value: any;
    }): boolean;

    updateProperty({
                     id,
                     property,
                     idx,
                     value,
                   }: {
      id: string;
      property: string;
      idx: number;
      value: any;
    }): Entity;

    deleteProperty({
                     id,
                     property,
                     idx,
                   }: {
      id: string;
      property: string;
      idx: number;
    }): void;

    deleteAllProperties({
                          id,
                          property,
                        }: {
      id: string;
      property: string;
    }): void;

    ingestAndLink({
                    id,
                    property,
                    propertyId,
                    json,
                  }: {
      id: string;
      property: string;
      propertyId?: string;
      json: any;
    }): void;

    flatten(json: any): Entity[];

    linkEntity({
                 id,
                 property,
                 propertyId,
                 value,
               }: {
      id: string;
      property: string;
      propertyId?: string;
      value: any;
    }): void;

    unlinkEntity({
                   id,
                   property,
                   value,
                   stop,
                 }: {
      id: string;
      property: string;
      value: any;
      stop?: boolean;
    }): void;

    purgeUnlinkedEntities(): void;

    exportCrate(): Crate;

    exportEntityTemplate({
                           id,
                           resolveDepth,
                         }: {
      id: string;
      resolveDepth?: number;
    }): Entity;

    getErrors(): any;

    getWarnings(): any;

    private __updateContext({
                              name,
                              id,
                            }: {
      name: string;
      id?: string;
    }): void;

    private __normaliseContext(context: any): any;

    private __storeEntityType(entity: Entity): void;

    private __removeEntityType(entity: Entity): void;

    private __collectAllDefinitions(context: any): any;

    private __setError(error: string, entity: any): void;

    private __setWarning(warning: string, entity: any): void;

    private __materialiseEntity({ id }: { id: string }): Entity;

    private __confirmNoClash({
                               entity,
                               mintNewId,
                             }: {
      entity: Entity;
      mintNewId?: boolean;
    }): Entity | false;

    private __updateEntityId({
                               oldId,
                               newId,
                             }: {
      oldId: string;
      newId: string;
    }): void;

    private __addReverse({
                           id,
                           property,
                           value,
                         }: {
      id: string;
      property: string;
      value: any;
    }): void;

    private __removeAssociations(entity: Entity): Entity;
  }

  interface SetCurrentEntityParams {
    id?: string;
    updateState?: boolean;
  }

  declare function setCurrentEntity(params: SetCurrentEntityParams): Promise<void>;

  type DescriboInternals = {
    cm: CrateManager,
    pm: ProfileManager,
    state: any
    setCurrentEntity: (params: SetCurrentEntityParams) =>Promise<void>,
    setTab: (tabName: string) => void,
    toggleReverseLinkBrowser: () => void,
    refresh: () => void
  }
}
