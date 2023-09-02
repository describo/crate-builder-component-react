
export interface JSONObject {
  [key: string]: any;
}

export interface EntityTemplatesParams {
  type?: Array<any> | string;
  queryString?: string;
  limit?: number;
}

export interface Lookup {
  // code to lookup entity templates in *YOUR* system
  //
  // type: the @type of template to lookup
  // queryString: what the user is looking for. You probably want to look in the
  //   @id and name fields at least
  // limit: number of matches to return
  entityTemplates(params: EntityTemplatesParams): Promise<void>;
}

export type DescriboCrateBuilderProps = {
  // The crate to display and edit
  crate?: JSONObject

  // Profile to use when editing the crate
  profile?: JSONObject,

  // Id of selected entity
  entityId?: string,

  // Callbacks for crate related lookups
  lookup?: Lookup,
  // mode?: "embedded" | "online",

  // Enable context editor functionality? Only used at component initialization time.
  enableContextEditor?: boolean,

  // Enable crate preview functionality? Only used at component initialization time.
  enableCratePreview?: boolean,

  // Enable entity browser functionality? Only used at component initialization time.
  enableBrowseEntities?: boolean,

  // Enable entity browser functionality? Only used at component initialization time.
  enableTemplateSave?: boolean,

  // If true, component will not allow changes and won't call onSaveCrate()
  readonly?: boolean,

  // enableReverseLinkBrowser: (default: true): enable / disable the reverse link browser. If enabled, it can be shown as a right sidebar as required.
  enableReverseLinkBrowser?: boolean,

  enableInternalRouting?: boolean,

  // purgeUnlinkedEntities: (default: true): purge unlinked entities from the crate before emitting the crate for saving
  purgeUnlinkedEntities?: boolean

  // localization language of the component. Suppoerted values: en, hu, defaults to en
  language?: string

  // Callback when component is ready to be used.
  onReady?: () => void,

  // Callback when component reports an error
  onError?: (message: string) => void,

  // Callback called when the crate has changed.
  onSaveCrate?: (crate: JSONObject) => void,

  // Callback called when the crate is to be saved as a template. If you implement onSaveCrateAsTemmplate, you should
  // also pass a Lookup object with entityTemplates so that the saved templates can be looked up reused in the
  // component.
  onSaveCrateAsTemplate?: (name: string, crate: JSONObject) => void

  // Callback called when the entity is to be saved as a template. If you implement onSaveEntityAsTemplate, you should
  // also pass a Lookup object with entityTemplates so that the saved templates can be looked up reused in the
  // component.
  onSaveEntityAsTemplate?: (name: string, entity: JSONObject) => void

  // Callback when crate builder navigates to a context entity
  onNavigation?: (entity: {"@id": string}) => void

  // Location of layout tabs
  tabLocation?: 'left' | 'right' | 'top' | 'bottom'

  // Show control bar with button like preview, delete entity, etc. or not
  showControls?: boolean
}
