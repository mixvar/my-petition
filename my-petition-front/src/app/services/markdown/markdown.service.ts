import { Injectable } from '@angular/core';
import Marked from 'marked';

import IMarkdownService from './markdown.service.interface';


const markedOptions = {};

@Injectable()
export class MarkdownService implements IMarkdownService {

  private marked: any = Marked.setOptions(markedOptions);

  constructor() { }

  parse(mdSource: string): string {
    return (mdSource)
      ? this.marked.parse(mdSource)
      : undefined;
  }

  serialize(mdSource: string): string {
    return (mdSource || '');
  }

  deserialize(json: string): string {
    return json.split('\\n').join('\n');
  }

}
