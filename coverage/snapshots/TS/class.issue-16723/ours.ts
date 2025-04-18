export class JiraCreatePixFraudDetectionGateway
  implements Pick<IssuePixFraudDetectionGateway, "createPixFraudDetectionIssue">
{
  constructor(logger: Logger) {
    this.logger = logger.child({
      context: JiraCreatePixFraudDetectionGateway.name,
    });
  }
}
