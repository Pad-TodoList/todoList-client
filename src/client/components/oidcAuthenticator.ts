import { User, UserManager } from "oidc-client-ts";

type Response = {
  access_token: string;
  refresh_token: string;
  expires_in: number;
};

export class OidcLogin {
  parameters = {
    stsAuthority: "/cas/oidc/",
    clientId: `${process.env.CAS_CLIENT_ID}`,
    clientRoot: `${window.location.href}`,
    clientScope: "openid profile email api",
    apiRoot: "/uaa/api/",
  };

  public userManager: UserManager;

  constructor() {
    const settings = {
      authority: this.parameters.stsAuthority,
      client_id: this.parameters.clientId,
      redirect_uri: `${this.parameters.clientRoot}`,
      silent_redirect_uri: `${this.parameters.clientRoot}`,
      post_logout_redirect_uri: `${this.parameters.clientRoot}`,
      response_type: "code",
      scope: this.parameters.clientScope,
    };
    this.userManager = new UserManager(settings);
  }

  public login(): Promise<void> {
    return this.userManager.signinRedirect();
  }

  public accessToken(): Promise<Response> {
    return this.userManager.signinRedirectCallback().then((user) => ({
      access_token: `${user?.access_token || ""}`,
      refresh_token: `${user?.refresh_token || ""}`,
      expires_in: user?.expires_in || 0,
    }));
  }

  public renewToken(): Promise<User | null> {
    return this.userManager.signinSilent();
  }

  public logout(): Promise<void> {
    return this.userManager.signoutRedirect();
  }
}
