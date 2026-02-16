/**
 * question router
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::question.question',{
    config: {
        find: {
            middlewares: ['api::question.option-populate'],
        }
    }
});
