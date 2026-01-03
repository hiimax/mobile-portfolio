package main

// Project represents a portfolio project
type Project struct {
	ID        string            `json:"id"`
	Title     string            `json:"title"`
	Tagline   string            `json:"tagline"`
	Role      string            `json:"role"`
	Timeline  string            `json:"timeline"`
	Stack     []string          `json:"stack"`
	HeroColor string            `json:"heroColor"`
	VideoURL  string            `json:"videoUrl"`
	Links     map[string]string `json:"links"`
	Challenge string            `json:"challenge"`
	Solution  string            `json:"solution"`
	Gallery   []GalleryItem     `json:"gallery"`
	Next      *NextProject      `json:"next"`
}

type GalleryItem struct {
	Type string `json:"type"` // "image" or "color"
	URL  string `json:"url,omitempty"`
	Val  string `json:"val,omitempty"`
}

type NextProject struct {
	ID   string `json:"id"`
	Name string `json:"name"`
}

// SiteConfig represents global theme settings
type SiteConfig struct {
	AccentColor string `json:"accentColor"`
	BgColor     string `json:"bgColor"`
	FontHeading string `json:"fontHeading"`
	FontMono    string `json:"fontMono"`
}

// DatabaseSchema represents the structure of our JSON db file
type DatabaseSchema struct {
	Config   SiteConfig         `json:"config"`
	Projects map[string]Project `json:"projects"`
}
