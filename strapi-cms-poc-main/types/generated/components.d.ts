import type { Schema, Struct } from '@strapi/strapi';

export interface QuestionnaireOption extends Struct.ComponentSchema {
  collectionName: 'components_questionnaire_options';
  info: {
    displayName: 'Option';
  };
  attributes: {
    free_text: Schema.Attribute.Text;
    option: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'questionnaire.option': QuestionnaireOption;
    }
  }
}
