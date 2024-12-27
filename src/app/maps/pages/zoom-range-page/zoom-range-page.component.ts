import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { LngLat, Map } from 'mapbox-gl';

@Component({
  templateUrl: './zoom-range-page.component.html',
  styleUrl: './zoom-range-page.component.css'
})
export class ZoomRangePageComponent implements AfterViewInit, OnDestroy {

  @ViewChild('map') divMap?: ElementRef;

  public zoom: number = 10;
  public map?: Map;
  public currentLngLat: LngLat = new LngLat(-76.5229424486871, 3.432890537787543);

  ngAfterViewInit(): void {

    if ( !this.divMap ) throw 'El elemento HTML no fue encontrado';

    this.map = new Map({
      container: this.divMap?.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: this.currentLngLat,
      zoom: this.zoom,
    });

    this.mapListeners();
  }

  //Cuando el componente se destruye quitamos todo el mapa para limpiar los listeners
  //ya que estos siguen en memoria si no los limpiamos
  ngOnDestroy(): void {
    this.map?.remove();
  }

  mapListeners() {
    if ( !this.map ) throw 'Map no inicializado';

    //Cada vez que cambie el zoom obtenemos el zoom y lo aplicamos a nuestra propiedad
    this.map.on('zoom', (ev) => {
      this.zoom = this.map!.getZoom();
    });

    this.map.on('zoomend', (ev) => {
      if( this.map!.getZoom() < 18 ) return;
      this.map!.zoomTo(18);
    });

    this.map.on('move', () => {
      this.currentLngLat = this.map!.getCenter();
      const { lng, lat } = this.currentLngLat;
    })

  }

  zoomIn() {
    this.map?.zoomIn();
  }

  zoomOut() {
    this.map?.zoomOut();
  }

  zoomChange( value: string ) {
    this.zoom = Number(value);
    this.map?.zoomTo( this.zoom );
  }
}
