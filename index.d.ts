import { Component } from 'react';

declare type MapProps = {
  geozone: number[];
  setRef(r: any): void;
};

declare class <Map> extends Component<MapProps> {}

export { Map, MapProps };
