import { HttpParams, HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SendData {
  penyakit: any = [];
  detail_penyakit: any = [];
  detail_gejalas: any = [];
  detail_gejala: any = [];
  kuesioner_all: any = [];

  status: any;

  edit_penyakit: any;
  edit_gejala: any;

  webfolder: string = 'api';
  // server: string = 'http://test.com/api';
  server: string = 'https://backend-iguana.herokuapp.com';
  // controller: string = this.server + '/service/';
  controller: string = this.server + '/api/v1/';

  constructor(private httpClient: HttpClient) {}

  get_penyakit(): Observable<any> {
    let header = new HttpHeaders();
    header.append('Accept', 'application/json');
    header.append('Content-Type', 'application/x-www-form-urlencoded');
    header.append('No-Auth', 'True');
    let body = new HttpParams();
    //body = body.set('penyakit_id', penyakit_id)
    return this.httpClient.post(this.controller + 'get_penyakit', body, {
      headers: header,
    });
  }

  get_gejala(): Observable<any> {
    let header = new HttpHeaders();
    header.append('Accept', 'application/json');
    header.append('Content-Type', 'application/x-www-form-urlencoded');
    header.append('No-Auth', 'True');
    let body = new HttpParams();
    //body = body.set('penyakit_id', penyakit_id)
    return this.httpClient.post(this.controller + 'get_gejala', body, {
      headers: header,
    });
  }

  get_penyakit_by_id(penyakit_id: string = ''): Observable<any> {
    let header = new HttpHeaders();
    header.append('Accept', 'application/json');
    header.append('Content-Type', 'application/x-www-form-urlencoded');
    header.append('No-Auth', 'True');
    let body = new HttpParams();
    body = body.set('id_penyakit', penyakit_id);
    return this.httpClient.post(
      this.controller + `get_penyakit_by_id/${penyakit_id}`,
      body,
      {
        headers: header,
      }
    );
  }

  get_gejala_by_id(gejala_id: string = ''): Observable<any> {
    let header = new HttpHeaders();
    header.append('Accept', 'application/json');
    header.append('Content-Type', 'application/x-www-form-urlencoded');
    header.append('No-Auth', 'True');
    let body = new HttpParams();
    body = body.set('id_gejala', gejala_id);
    return this.httpClient.post(
      this.controller + `get_gejala_by_id/${gejala_id}`,
      body,
      {
        headers: header,
      }
    );
  }

  get_gejala_join_by_id(id_gejala: string = '') {
    let header = new HttpHeaders();
    header.append('Accept', 'application/json');
    header.append('Content-Type', 'application/x-www-form-urlencoded');
    header.append('No-Auth', 'True');
    let body = new HttpParams();
    body = body.set('id_gejala', id_gejala);
    return this.httpClient.post(
      this.controller + 'get_gejala_join_by_id',
      body,
      { headers: header }
    );
  }

  get_gejala_join_by_id2(id_gejala: string = '') {
    let header = new HttpHeaders();
    header.append('Accept', 'application/json');
    header.append('Content-Type', 'application/x-www-form-urlencoded');
    header.append('No-Auth', 'True');
    let body = new HttpParams();
    body = body.set('id_gejala', id_gejala);
    return this.httpClient.post(
      this.controller + 'get_gejala_join_by_id2',
      body,
      { headers: header }
    );
  }

  get_kuesioner_order() {
    let header = new HttpHeaders();
    header.append('Accept', 'application/json');
    header.append('Content-Type', 'application/x-www-form-urlencoded');
    header.append('No-Auth', 'True');
    let body = new HttpParams();
    //body = body.set('id_gejala', gejala_id)
    return this.httpClient.post(this.controller + 'get_kuesioner_order', body, {
      headers: header,
    });
  }

  get_gejala_join() {
    let header = new HttpHeaders();
    header.append('Accept', 'application/json');
    header.append('Content-Type', 'application/x-www-form-urlencoded');
    header.append('No-Auth', 'True');
    let body = new HttpParams();
    //body = body.set('id_gejala', gejala_id)
    return this.httpClient.post(this.controller + 'get_gejala_join', body, {
      headers: header,
    });
  }

  create_penyakit(
    nama_penyakit: string = '',
    foto_penyakit: string = '',
    desc_penyakit: string = '',
    desc_pengobatan: string = ''
  ) {
    let header = new HttpHeaders();
    header.append('Accept', 'application/json');
    header.append('Content-Type', 'application/x-www-form-urlencoded');
    header.append('No-Auth', 'True');
    let body = new HttpParams();
    body = body.set('nama_penyakit', nama_penyakit);
    body = body.set('foto_penyakit', foto_penyakit);
    body = body.set('desc_penyakit', desc_penyakit);
    body = body.set('desc_pengobatan', desc_pengobatan);

    return this.httpClient.post(this.controller + 'create_penyakit', body, {
      headers: header,
    });
  }

  create_gejala(
    id_penyakit: string = '',
    desc_gejala: string = '',
    desc_kuesioner = ''
  ) {
    let header = new HttpHeaders();
    header.append('Accept', 'application/json');
    header.append('Content-Type', 'application/x-www-form-urlencoded');
    header.append('No-Auth', 'True');
    let body = new HttpParams();
    body = body.set('id_penyakit', id_penyakit);
    body = body.set('desc_gejala', desc_gejala);
    body = body.set('desc_kuesioner', desc_kuesioner);
    return this.httpClient.post(this.controller + 'create_gejala', body, {
      headers: header,
    });
  }

  update_penyakit(
    id_penyakit: string = '',
    nama_penyakit: string = '',
    foto_penyakit: string = '',
    desc_penyakit: string = '',
    desc_pengobatan: string = ''
  ) {
    let header = new HttpHeaders();
    header.append('Accept', 'application/json');
    header.append('Content-Type', 'application/x-www-form-urlencoded');
    header.append('No-Auth', 'True');
    let body = new HttpParams();
    body = body.set('id_penyakit', id_penyakit);
    body = body.set('nama_penyakit', nama_penyakit);
    body = body.set('foto_penyakit', foto_penyakit);
    body = body.set('desc_penyakit', desc_penyakit);
    body = body.set('desc_pengobatan', desc_pengobatan);
    return this.httpClient.post(this.controller + 'update_penyakit', body, {
      headers: header,
    });
  }

  update_penyakit2(
    id_penyakit: string = '',
    nama_penyakit: string = '',
    desc_penyakit: string = '',
    desc_pengobatan: string = ''
  ) {
    let header = new HttpHeaders();
    header.append('Accept', 'application/json');
    header.append('Content-Type', 'application/x-www-form-urlencoded');
    header.append('No-Auth', 'True');
    let body = new HttpParams();
    body = body.set('id_penyakit', id_penyakit);
    body = body.set('nama_penyakit', nama_penyakit);
    body = body.set('desc_penyakit', desc_penyakit);
    body = body.set('desc_pengobatan', desc_pengobatan);
    return this.httpClient.post(this.controller + 'update_penyakit2', body, {
      headers: header,
    });
  }

  update_gejala(
    id_gejala: string = '',
    desc_gejala: string = '',
    desc_kuesioner = ''
  ) {
    let header = new HttpHeaders();
    header.append('Accept', 'application/json');
    header.append('Content-Type', 'application/x-www-form-urlencoded');
    header.append('No-Auth', 'True');
    let body = new HttpParams();
    body = body.set('id_gejala', id_gejala);
    body = body.set('desc_gejala', desc_gejala);
    body = body.set('desc_kuesioner', desc_kuesioner);
    return this.httpClient.post(this.controller + 'update_gejala', body, {
      headers: header,
    });
  }

  delete_penyakit(id_penyakit: string = '') {
    let header = new HttpHeaders();
    header.append('Accept', 'application/json');
    header.append('Content-Type', 'application/x-www-form-urlencoded');
    header.append('No-Auth', 'True');
    let body = new HttpParams();
    body = body.set('id_penyakit', id_penyakit);
    return this.httpClient.post(this.controller + 'delete_penyakit', body, {
      headers: header,
    });
  }

  delete_gejala(id_gejala: string = '') {
    let header = new HttpHeaders();
    header.append('Accept', 'application/json');
    header.append('Content-Type', 'application/x-www-form-urlencoded');
    header.append('No-Auth', 'True');
    let body = new HttpParams();
    body = body.set('id_gejala', id_gejala);
    return this.httpClient.post(this.controller + 'delete_gejala', body, {
      headers: header,
    });
  }
}
