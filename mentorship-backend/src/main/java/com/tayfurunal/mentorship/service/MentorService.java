package com.tayfurunal.mentorship.service;

import com.tayfurunal.mentorship.domain.Mentor;
import com.tayfurunal.mentorship.payload.ApiResponse;
import com.tayfurunal.mentorship.payload.ApplyStatusRequest;

import org.springframework.http.ResponseEntity;

public interface MentorService {

    ResponseEntity<ApiResponse> applyMentorship(Mentor mentor, String username);

    ResponseEntity<?> changeApplyStatus(ApplyStatusRequest status, Long id);

    ResponseEntity<?> getAllByInProgress();

    ResponseEntity<Mentor> getByIdAndProgressStatus(Long id, Mentor.progressStatus progressStatus);

    ResponseEntity<?> getAllByAccepted();

    ResponseEntity<?> getAllByAcceptedWithSearch(String main, String subs, String thoughts);
}
