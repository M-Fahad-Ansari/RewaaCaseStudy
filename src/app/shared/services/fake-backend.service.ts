import { Injectable } from '@angular/core';
import { Language } from '../language/language.model';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { SystemFlags } from '../system-flags/system-flags.model';

import languages from './data/languages.json';
import userRights from './data/user-rights.json';
import systemFlags from './data/system-flags.json';

@Injectable()
export class FakeBackendService implements InMemoryDbService {
  createDb(): DbResponse {
    return {
      UserRights: userRights,
      Languages: languages,
      SystemFlags: systemFlags
    };
  }
}

export interface DbResponse {
  UserRights: string[];
  Languages: Language[];
  SystemFlags: SystemFlags;
}
