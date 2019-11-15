import { NgModule } from '@angular/core';

import { MatIconModule, MatToolbarModule, MatButtonModule, MatCardModule, MatSidenavModule  } from '@angular/material';

@NgModule({
    imports:[ MatIconModule, MatToolbarModule, MatButtonModule, MatCardModule, MatSidenavModule],
    exports: [ MatIconModule, MatToolbarModule, MatButtonModule, MatCardModule, MatSidenavModule],
})

export class materialModule {}