import createLRUCache from "../utils/lru-cache";

// Remove all newlines, double spaces, etc
function normalizeText(src: string) {
  src = src.split("\n").join(" ");
  src = src.replace(/\s+/gm, " ");
  return src;
}

function extractPromptCacheKey(args: {
  prefix: string;
  suffix: string | null;
}) {
  if (args.suffix) {
    return normalizeText(args.prefix + " ##CURSOR## " + args.suffix);
  } else {
    return normalizeText(args.prefix);
  }
}

const promptCache = createLRUCache<string, string | null>({ maxSize: 1000 });

export function getFromPromptCache(args: {
  prefix: string;
  suffix: string | null;
}): string | undefined | null {
  const key = extractPromptCacheKey(args);
  return promptCache.get(key);
}

export function setPromptToCache(args: {
  prefix: string;
  suffix: string | null;
  value: string | null;
}) {
  const key = extractPromptCacheKey(args);
  promptCache.set(key, args.value);
}
