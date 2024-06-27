type ParamID = string | number;

export const BASE_PROXY = {
  employees: '/api/employees/v1',
  innovation: '/api/innovation/v1',
  repository: '/api/repository/v1',
};

export const EMPLOYEES_ENDPOINT = {
  GET: {
    employees: '/employee',
    employeeProfile: (employeeId: ParamID) =>
      `/employee/${employeeId}/profile`,
  },
};

export const INNOVATION_ENDPOINT = {
  GET: {
    competitionStats: '/competition/stats',
    participantScores: '/competition/participant-scores',
    curationParameters: '/competition/curation-parameter',
    innovationMentor: (innovationId: ParamID) =>
      `/mentoring/mentor/${innovationId}`,
    mentoringReport: (innovationId: ParamID) =>
      `/mentoring/report/${innovationId}`,
    submissionProposal: (innovationId: ParamID) =>
      `/innovation/proposal/${innovationId}`,
    innovations: '/competition/participant',
    userRole: (employeeId: ParamID) => `/employeeRole/${employeeId}`,
    curationSummary: '/competition/summary',
    innovationCurations: '/competition/currations',
    innovationMilestone: (innovationId: ParamID) =>
      `/getMilestoneIde/${innovationId}`,
    innovationDetail: (innovationId: ParamID) =>
      `/getInnovationDetail/${innovationId}`,
    innovationTimeline: (innovationId: ParamID) =>
      `/milestone/participant-timeline/${innovationId}`,
  },
  POST: {
    innovationsScoring: '/competition/participant-scores',
    saveInnovation: '/innovationSave',
  },
  PUT: {
    mentoringReport: (innovationId: ParamID) =>
      `/mentoring/report-file/${innovationId}`,
    mentoringReportStatus: (fileId: ParamID) =>
      `/mentoring/report-status/${fileId}`,
    submissionProposals: (innovationId: ParamID) =>
      `/competition/submission-proposal/${innovationId}`,
    reviseInnovationScore: (innovationId: ParamID) =>
      `/competition/revise-scores/${innovationId}`,
    advanceInnovation: '/competition/advance-innovation',
  },
};

export const REPOSITORY_ENDPOINT = {
  POST: {
    file: '/file',
  },
};
