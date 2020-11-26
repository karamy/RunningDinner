import { TestBed } from '@angular/core/testing';

import { ChatService } from 'src/app/home/chat/chat.service';

describe('ChatService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChatService = TestBed.get(ChatService);
    expect(service).toBeTruthy();
  });
});
