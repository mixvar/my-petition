
abstract class IMarkdownService {

  abstract parse(mdSource: string): string;

  abstract serialize(mdSource: string): string;

  abstract deserialize(json: string): string;
}

export default IMarkdownService;
