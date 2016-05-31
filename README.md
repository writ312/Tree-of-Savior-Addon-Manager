# Tree of Savior Addon Manager

Tree of Savior Addon Manager is an application that allows you to easily find and downloads addons and keep them up to date. This does all of the work for you so you can simply worry about playing the game.

![Tree of Savior Experience Viewer](http://i.imgur.com/rzMR83k.png)

# Submitting

Make a pull request to [Addons](https://github.com/Tree-of-Savior-Addon-Community/Addons) in order to update `addons.json` to point to your addon repository. Example:

```json
{
	"sources" : [
		{
			"repo" : "Excrulon/Test-Addon"
		},
		{
			"repo" : "TehSeph/tos-addons"
		},
		{
			"repo" : "MizukiBelhi/ExtendedUI"
		},
		{
			"repo" : "Miei/TOS-lua"
		}
	]
}
```

Then, in your own repo where your addon lives, create an `addon.json` that describes your packages.

```json
[
	{
		"name" : "Experience Viewer",
		"file" : "experienceviewer",
		"extension" : "ipf",
		"fileVersion" : "v1.0.0",
		"releaseTag" : "v1.0.0",
		"unicode" : "⛄",
		"description" : "Displays various experience values such as current experience, required experience, current percent, experience gained on last kill, kills til next level, experience per hour, and estimated time until level up.",
		"tags" : [
			"experience",
			"ui"
		]
	},
	{
		"name" : "Map Fog Viewer",
		"file" : "mapfogviewer",
		"extension" : "ipf",
		"fileVersion" : "v1.0.0",
		"releaseTag" : "v1.0.0",
		"unicode" : "⛄",
		"description" : "Displays the fog on the map as red tiles instead of the hard to see default fog. Makes exploration really easy!",
		"tags" : [
			"map",
			"minimap",
			"fog",
			"exploration"
		]
	}
]
```

`name`: The name of your addon. This can be anything you want.

`releaseTag`: The tag name of your release.

`file`: The filename of your addon in the release, minus the extension. This should never change once submitted.

`extension`: The extension of your addon in the release. For now, only `ipf` is supported.

`fileVersion`: The version of your addon. All `fileVersion`s need to follow [semantic versions](http://semver.org/) in order for updates to be processed properly.

`unicode`: The unicode character you want to use in your downloaded addon filename.

`description`: A detailed description of your addon.

`tags`: A list of keywords that describes what your addon is for searching.
