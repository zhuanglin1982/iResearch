/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { IResearchTestModule } from '../../../test.module';
import { SurveyComponent } from '../../../../../../main/webapp/app/entities/survey/survey.component';
import { SurveyService } from '../../../../../../main/webapp/app/entities/survey/survey.service';
import { Survey } from '../../../../../../main/webapp/app/entities/survey/survey.model';

describe('Component Tests', () => {

    describe('Survey Management Component', () => {
        let comp: SurveyComponent;
        let fixture: ComponentFixture<SurveyComponent>;
        let service: SurveyService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [IResearchTestModule],
                declarations: [SurveyComponent],
                providers: [
                    SurveyService
                ]
            })
            .overrideTemplate(SurveyComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SurveyComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SurveyService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Survey(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.surveys[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
