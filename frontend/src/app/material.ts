import { NgModule } from '@angular/core';

import { MatIconModule, MatToolbarModule, MatButtonModule, MatCardModule  } from '@angular/material';

@NgModule({
    imports:[ MatIconModule, MatToolbarModule, MatButtonModule, MatCardModule],
    exports: [ MatIconModule, MatToolbarModule, MatButtonModule, MatCardModule],
})

export class materialModule {}