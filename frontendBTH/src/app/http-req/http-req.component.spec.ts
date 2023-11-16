import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpReqComponent } from './http-req.component';

describe('HttpReqComponent', () => {
  let component: HttpReqComponent;
  let fixture: ComponentFixture<HttpReqComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HttpReqComponent]
    });
    fixture = TestBed.createComponent(HttpReqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
