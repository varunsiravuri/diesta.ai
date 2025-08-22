export interface APIconfig{
    apiKey: string;
    baseUrl: string;
    model? : string;
}

export interface Chat{
    id: string;
    title: string;
    messages : Message[];
    createdAt: Date;
    updatesAt: Date;
}

export interface AIProvider{
    id: string;
    name: string;
    icon: string;
    color: string;
}

