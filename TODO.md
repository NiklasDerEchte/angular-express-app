- angular.json
  - In die Styles müssen doch default Material Templates geladen werden damit zumindest alle Variablen mal mit Farben gefüllt sind, die Custom-Themes überschreiben die dann. @angular/material/prebuilt-themes/azure-blue.css"


- m3/golbal styles
  - Tollbar height ist von scss in css nicht erreichbar, also in css packen:
  :root{
    --toolbar-height: 64px;
    --mat-dialog-container-max-width: auto;
    .main-content {
        margin-top: var(--toolbar-height);
        height: calc(100% - var(--toolbar-height));
        width: 100%;
        position: absolute;
    }
}