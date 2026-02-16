/**
 * `option-populate` middleware
 */

import type { Core } from '@strapi/strapi';

const populate = {
    options: true,
}

export default (config, { strapi }: { strapi: Core.Strapi }) => {
  // Add your own logic here.
  return async (ctx, next) => {
    ctx.query.populate = populate;
    strapi.log.info('In option-populate middleware.');

    await next();
  };
};
