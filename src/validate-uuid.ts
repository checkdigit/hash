// validate-uuid.ts

const REGEX = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/iu;

export default function validateUuid(uuid: string): boolean {
  return REGEX.test(uuid);
}
