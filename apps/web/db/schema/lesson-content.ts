import { z } from "zod";

// Struktur block sesuai PRD §8.4 (LRN-005) dan contoh JSON §11.2.
// Nama field yang PRD sebut tanpa nama pasti ("line-wrapping preference",
// "optional evidence hint") diberi nama di sini (wrapLines, evidenceHint) —
// ditandai eksplisit sebagai asumsi, bukan diam-diam.

export const markdownBlockSchema = z.object({
  type: z.literal("markdown"),
  markdown: z.string().min(1),
});

export const codeBlockSchema = z.object({
  type: z.literal("code"),
  language: z.string().min(1),
  code: z.string().min(1),
  filename: z.string().optional(),
  caption: z.string().optional(),
  wrapLines: z.boolean().optional(), // nama field diasumsikan
});

export const imageBlockSchema = z.object({
  type: z.literal("image"),
  assetId: z.string(), // referensi mediaAssets.id — divalidasi keberadaannya di app-layer, bukan FK (block ada di JSONB)
  alt: z.string().min(1), // MED-004: wajib kecuali decorative
  caption: z.string().optional(),
  width: z.number().int().positive().optional(),
  height: z.number().int().positive().optional(),
});

export const calloutBlockSchema = z.object({
  type: z.literal("callout"),
  variant: z.enum(["info", "tip", "warning", "important"]),
  text: z.string().min(1),
});

export const resourceLinkBlockSchema = z.object({
  type: z.literal("resource_link"),
  label: z.string().min(1),
  url: z.url(),
  description: z.string().optional(),
});

export const taskBlockSchema = z.object({
  type: z.literal("task"),
  instruction: z.string().min(1),
  required: z.boolean(),
  evidenceHint: z.string().optional(), // nama field diasumsikan
});

export const lessonContentBlockSchema = z.discriminatedUnion("type", [
  markdownBlockSchema,
  codeBlockSchema,
  imageBlockSchema,
  calloutBlockSchema,
  resourceLinkBlockSchema,
  taskBlockSchema,
]);

export type LessonContentBlock = z.infer<typeof lessonContentBlockSchema>;
