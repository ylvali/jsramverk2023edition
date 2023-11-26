import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportAPIComponent } from './report-api.component';

describe('ReportAPIComponent', () => {
  let component: ReportAPIComponent;
  let fixture: ComponentFixture<ReportAPIComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReportAPIComponent]
    });
    fixture = TestBed.createComponent(ReportAPIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
