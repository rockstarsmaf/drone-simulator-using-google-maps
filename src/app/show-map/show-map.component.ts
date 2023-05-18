import { Component, OnInit, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { } from 'google-maps';
@Component({
  selector: 'app-show-map',
  templateUrl: './show-map.component.html',
  styleUrls: ['./show-map.component.scss']
})
export class ShowMapComponent implements OnInit {
  options: google.maps.MapOptions = {
    mapTypeId: "terrain",
    zoom: 4
  };
  mapLoaded: boolean = false;
  public currentPos: any;
  public map: google.maps.Map;
  public center: any;
  public simulateForm: FormGroup;
  public userCount = 0;
  private lines: any = [];
  private intervals: any = [];
  private icons: any = [];
  private times: any = [];
  public isPause: boolean = false;
  public isSimulate: boolean = false;
  constructor(
    private formbuiler: FormBuilder,
    private ngZone: NgZone
  ) { }
  ngOnInit(): void {
    this.buildFormGroup();
    navigator.geolocation.getCurrentPosition(pos => {
      this.center = {
        lat: pos.coords.latitude,
        lng: pos.coords.longitude
      };
      this.map = new google.maps.Map(
        document.getElementById('map') as HTMLElement,
        {
          ...this.options,
          center: this.center
        }
      );

      this.currentPos = new google.maps.Marker({
        position: this.center,
        map: this.map
      });
      this.map.addListener("click", (mapsMouseEvent) => {
        if (mapsMouseEvent.latLng != null)
          this.center = (mapsMouseEvent.latLng.toJSON());
        this.map.setCenter(this.center);
      });
      this.map.addListener('tilesloaded', () => {
        this.ngZone.run(() => {
          this.mapLoaded = true;
        });
      });
      this.currentPos = this.center;
    });
  }

  animatePolyline(line: any, time: any, offset?: any) {
    let steps = offset ? offset / 2 : 0;
    let numSteps = 50;
    let timePerStep = 1;
    const interval = window.setInterval(() => {
      steps += 1;
      if (steps > numSteps) {
        clearInterval(interval);
        if (this.intervals.length > 0 && this.userCount > 0) {
          this.userCount -= 1;
        }
      }
      else {
        const icons = line.get("icons");
        icons[0].offset = steps * 2 + '%';
        line.set("icons", icons);
      }
    }, time / numSteps);
    this.intervals.push(interval);
  }

  pauseTimer() {
    this.isSimulate = false;
    this.isPause = true;
    this.icons = [];
    for (let i = 0; i < this.intervals.length; i++) {
      this.icons.push(parseFloat(this.lines[i]["icons"][0].offset));
      clearInterval(this.intervals[i]);
    }
    this.intervals = [];
  }

  resumeTimer() {
    this.isSimulate = true;
    this.isPause = false;
    for (let i = 0; i < this.lines.length; i++) {
      this.animatePolyline(this.lines[i], this.times[i], this.icons[i]);
    }
  }

  private buildFormGroup() {
    this.simulateForm = this.formbuiler.group({
      latitude: ['', Validators.required],
      longitude: ['', Validators.required],
      time: ['', Validators.required]
    })
  }

  public onSubmit() {
    this.isSimulate = true;
    this.userCount = this.userCount + 1;
    this.times.push(this.simulateForm.controls['time'].value);
    const userCoords = {
      lat: this.simulateForm.controls['latitude'].value,
      lng: this.simulateForm.controls['longitude'].value
    }
    const userMarker = new google.maps.Marker({
      position: userCoords,
      map: this.map
    });

    const lineSymbol = {
      path: google.maps.SymbolPath.CIRCLE,
      scale: 8,
      strokeColor: "#393",
    }

    const line = new google.maps.Polyline({
      path: [
        this.currentPos,
        userCoords
      ],
      icons: [{
        icon: lineSymbol,
        offset: '0%'
      }],
      map: this.map,
    });
    this.lines.push(line);
    this.animatePolyline(line, this.simulateForm.controls['time'].value);
    this.simulateForm.reset();
  }
}
