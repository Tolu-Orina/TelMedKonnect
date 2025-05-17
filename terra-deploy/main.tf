provider "aws" {
  region     = "us-east-1"
  
}




resource "aws_amplify_app" "telmedkonnect" {
  name       = "telmedkonnect"
  repository = "https://github.com/Tolu-Orina/TelMedKonnect.git"
  
  # GitHub personal access token
  access_token = "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"
  
  platform = "WEB_COMPUTE" ## FOR NEXT JS APPS

  # Redirects for Single Page Web Apps (SPA)
  # https://docs.aws.amazon.com/amplify/latest/userguide/redirects.html#redirects-for-single-page-web-apps-spa
  custom_rule {
    source = "</^[^.]+$|\\.(?!(css|gif|ico|jpg|js|png|txt|svg|woff|ttf|map|json)$)([^.]+$)/>"
    status = "200"
    target = "/index.html"
  }

  environment_variables = {
    NEXT_PUBLIC_AWS_REGION="us-east-1"
    NEXT_PUBLIC_USER_POOL_ID="us-east-1_vPTLNfCct"
    NEXT_PUBLIC_USER_POOL_CLIENT_ID="miaq82hjt2oqkrqocltr1p2u9"
    
  }
}



resource "aws_amplify_branch" "main" {
  app_id      = aws_amplify_app.telmedkonnect.id
  branch_name = "main"

  framework = "Next.js - SSR"
  stage     = "PRODUCTION"

  enable_auto_build = "true"

}

resource "aws_amplify_domain_association" "telmedkonnect" {
  app_id      = aws_amplify_app.telmedkonnect.id
  domain_name = "conquerorfoundation.com"


  # https://telmedkonnect.conquerorfoundation.com
  sub_domain {
    branch_name = aws_amplify_branch.main.branch_name
    prefix      = "telmedkonnect"
  }
  
  wait_for_verification = "false"
}
