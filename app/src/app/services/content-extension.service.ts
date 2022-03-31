/*
 * Copyright © 2005 - 2021 Alfresco Software, Ltd. All rights reserved.
 *
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

import { Injectable } from '@angular/core';
import { AppConfigService } from '@alfresco/adf-core';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ContentExtensionService {
  enabled: boolean = false;
  constructor(
    private appConfigService: AppConfigService
  ) {
    // TODO: ADF appConfigService.onLoad might better to be a ReplaySubject, but until then:
    this.appConfigService.onLoad.pipe(take(1)).subscribe((config) => {
      if (config.plugins && (config.plugins.content === true || config.plugins.content === 'true')) {
        this.enableContent();
      } else if (config.plugins && (!config.plugins.content || config.plugins.content === false || config.plugins.content === 'false')) {
        this.disableContent();
      }
    });
  }

  disableContent() {
    this.enabled = false;
    if (localStorage) {
      localStorage.setItem('contentPlugin', 'false');
    }
  }

  enableContent() {
    this.enabled = true;
    if (localStorage) {
      localStorage.setItem('contentPlugin', 'true');
    }
  }
}
