import { NgModule } from '@angular/core';

import { MatIconModule, MatToolbarModule, MatButtonModule, MatCardModule, MatSidenavModule, MatListModule  } from '@angular/material';

@NgModule({
    imports:[ MatIconModule, MatToolbarModule, MatButtonModule, MatCardModule, MatSidenavModule, MatListModule],
    exports: [ MatIconModule, MatToolbarModule, MatButtonModule, MatCardModule, MatSidenavModule, MatListModule],
})

export class materialModule {}