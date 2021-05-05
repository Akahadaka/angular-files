import { Component, OnInit } from '@angular/core'

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  providers: [{ provide: Window, useValue: window }]
})
export class AppComponent implements OnInit {
  files: FileSystemFileHandle [] = [];

  constructor(private window: Window) {}

  ngOnInit() {}

  async onOpenFolder() {
    // Only works in supported browsers:
    // https://caniuse.com/?search=showDirectoryPicker
    // Chrome | Edge | Opera
    const dirHandle = await (this.window as any).showDirectoryPicker();
    for await (const entry of dirHandle.values()) {
      console.log(entry);
      this.files.push(entry);
    }
  }
}
