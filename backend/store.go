package main

import (
	"encoding/json"
	"io/ioutil"
	"os"
	"sync"
)

const dbFile = "data.json"

type Store struct {
	mu   sync.RWMutex
	Data DatabaseSchema
}

var DB *Store

func InitDB() {
	DB = &Store{
		Data: DatabaseSchema{
			Config: SiteConfig{
				AccentColor: "#64ffda",
				BgColor:     "#0a0a12",
				FontHeading: "Inter, sans-serif",
				FontMono:    "JetBrains Mono, monospace",
			},
			Projects: make(map[string]Project),
		},
	}

	// Load existing data if file exists
	if _, err := os.Stat(dbFile); err == nil {
		file, _ := ioutil.ReadFile(dbFile)
		json.Unmarshal(file, &DB.Data)
	} else {
		// Seed default data if new
		seedData()
		SaveDB()
	}
}

func SaveDB() error {
	DB.mu.Lock()
	defer DB.mu.Unlock()

	file, err := json.MarshalIndent(DB.Data, "", "  ")
	if err != nil {
		return err
	}
	return ioutil.WriteFile(dbFile, file, 0644)
}

func seedData() {
	// Seed with default data
	civic := Project{
		ID:        "civic24",
		Title:     "Civic24",
		Tagline:   "Bridging the gap between citizens and public services.",
		Role:      "Founder & Lead Engineer",
		Timeline:  "Jan Active",
		Stack:     []string{"Flutter", "Dart", "Firebase", "Node.js"},
		HeroColor: "linear-gradient(135deg, #13131f 0%, #1c1c2e 100%)",
		VideoURL:  "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
		Links:     map[string]string{"apple": "#", "google": "#"},
		Challenge: "Public service delivery in Lagos is often fragmented...",
		Solution:  "I architected a mobile-first solution using **Flutter**...",
		Gallery: []GalleryItem{
			{Type: "image", URL: "https://images.unsplash.com/photo-1570126618953-d437176e8c79?q=80&w=800&auto=format&fit=crop"},
		},
		Next: &NextProject{ID: "fintech-vault", Name: "FinTech Vault"},
	}
    
    DB.Data.Projects["civic24"] = civic
}
