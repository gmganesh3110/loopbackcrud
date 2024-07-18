// Uncomment these imports to begin using these cool features!

import {get} from '@loopback/rest';

// import {inject} from '@loopback/core';


export class HelloController {
  constructor() {}
  @get('/hello')
  getHello():string{
    return "Hello Controller"
  }
}
