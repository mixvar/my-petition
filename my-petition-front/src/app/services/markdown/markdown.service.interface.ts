
abstract class IMarkdownService {

  abstract parse(mdSource: string): string;

  abstract serialize(mdSource: string): string;

}

export default IMarkdownService;
