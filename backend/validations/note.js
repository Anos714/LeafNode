import joi from "joi";

export const noteSchema = joi
  .object({
    title: joi.string().max(120).trim().required(),
    content: joi.string().required(),

    isPinned: joi.boolean().default(false),

    tags: joi.array().items(joi.string().hex().length(24)),

    folder: joi.string().hex().length(24).allow(null),
  })
  .unknown(false);

export const tagSchema = joi
  .object({
    name: joi.string().trim().required(),
  })
  .unknown(false);

export const folderSchema = joi
  .object({
    name: joi.string().trim().required(),
  })
  .unknown(false);
