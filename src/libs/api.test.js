'use strict'

import http from 'http';
import API from './api';
// const API = 'http://localhost:3000/public/database/players.json';

describe('Testando a API', () => {

  let service;

  beforeEach((done) => {

    http.get('http://localhost:3000/public/database/players.json', (response) => {
      service = response;
      done();

    }).on('error', (err) => {
      // console.log('err', err)
      done();
    })
  })

  test('API está respondendo', () => {
    expect(service.statusCode).toBe(200);
  });

})
