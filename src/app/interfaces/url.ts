export interface url {
    url: string;
    shortUrl: string;
    isCopied: boolean;
}

export interface urlAPIReponse {
    ok: boolean
    result: urlData
}

export interface urlData {
    code: string
    short_link: string
    full_short_link: string
    short_link2: string
    full_short_link2: string
    short_link3: string
    full_short_link3: string
    share_link: string
    full_share_link: string
    original_link: string
}
