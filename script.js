document.getElementById('skillsTestForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Gather form data
    const formData = new FormData(this);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        categories: formData.getAll('category'),
        experience: parseInt(formData.get('experience')),
        projects: formData.get('projects').length,
        skills: formData.get('skills').length,
        additionalSkills: formData.getAll('additionalSkills[]').length,
        certifications: formData.get('certifications').length,
        education: formData.get('education').length,
        hobbies: formData.get('hobbies').length
    };

    // Determine category
    const result = determineCategory(data);
    
    // Display result
    document.getElementById('categoryResult').innerHTML = `
        <h3>You are best suited for:</h3>
        <p><strong>${result}</strong></p>
    `;
    document.getElementById('results').classList.remove('hidden');
});

function determineCategory(data) {
    const { categories, experience, projects, skills, additionalSkills } = data;
    let score = {
        Hackathons: 0,
        Creations: 0,
        Cellathons: 0
    };

    // Scoring system
    if (categories.includes('Hackathons')) {
        score.Hackathons += 2;
    }
    if (categories.includes('Creations')) {
        score.Creations += 2;
    }
    if (categories.includes('Cellathons')) {
        score.Cellathons += 2;
    }

    if (experience > 3) {
        score.Hackathons += 1;
        score.Creations += 1;
        score.Cellathons += 1;
    }

    if (projects > 100) {
        score.Creations += 3;
    }

    if (skills > 100) {
        score.Hackathons += 2;
    }

    if (additionalSkills > 0) {
        score.Hackathons += 1;
        score.Creations += 1;
    }

    // Determine highest score
    let maxCategory = 'Hackathons';
    let maxScore = score.Hackathons;

    for (let category in score) {
        if (score[category] > maxScore) {
            maxCategory = category;
            maxScore = score[category];
        }
    }

    return maxCategory;
}

function addSkillField() {
    const additionalSkills = document.getElementById('additionalSkills');
    const skillDiv = document.createElement('div');
    skillDiv.className = 'form-group';
    
    const label = document.createElement('label');
    label.innerHTML = 'Additional Skill:';
    
    const input = document.createElement('input');
    input.type = 'text';
    input.name = 'additionalSkills[]';
    input.placeholder = 'Enter a skill';

    skillDiv.appendChild(label);
    skillDiv.appendChild(input);
    additionalSkills.appendChild(skillDiv);
}
