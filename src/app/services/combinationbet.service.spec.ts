import { TestBed } from "@angular/core/testing";

import { CombinationbetService } from "./combinationbet.service";

describe("CombinationbetService", () => {
  let service: CombinationbetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CombinationbetService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
