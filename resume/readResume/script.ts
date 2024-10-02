interface EducationEntry {
    degree: string;
    institution: string;
    yearOfGraduation: number;
}

interface ExperienceEntry {
    jobTitle: string;
    company: string;
    duration: string;
    jobDescription: string;
}

interface CVFormData {
    fullName: string;
    email: string;
    phone: string;
    address?: string;
    education: EducationEntry[];
    experience: ExperienceEntry[];
    skills: string;
    profilePic?: string | null; // Optional: URL or data URL for profile picture
}

document.addEventListener('DOMContentLoaded', () => {
    const educationContainer = document.getElementById('education-container') as HTMLDivElement;
    const experienceContainer = document.getElementById('experience-container') as HTMLDivElement;
    let educationCount = 1;
    let experienceCount = 1;

    const addEducationEntry = () => {
        educationCount++;
        const newEducationEntry = document.createElement('div');
        newEducationEntry.classList.add('education-entry');
        newEducationEntry.innerHTML = `
            <label for="degree-${educationCount}">Degree:</label>
            <input type="text" id="degree-${educationCount}" name="degree-${educationCount}" required>
            
            <label for="institution-${educationCount}">Institution:</label>
            <input type="text" id="institution-${educationCount}" name="institution-${educationCount}" required>
            
            <label for="year-of-graduation-${educationCount}">Year of Graduation:</label>
            <input type="number" id="year-of-graduation-${educationCount}" name="year-of-graduation-${educationCount}" required>
        `;
        educationContainer.appendChild(newEducationEntry);
    };

    const addExperienceEntry = () => {
        experienceCount++;
        const newExperienceEntry = document.createElement('div');
        newExperienceEntry.classList.add('experience-entry');
        newExperienceEntry.innerHTML = `
            <label for="job-title-${experienceCount}">Job Title:</label>
            <input type="text" id="job-title-${experienceCount}" name="job-title-${experienceCount}" required>

            <label for="company-${experienceCount}">Company:</label>
            <input type="text" id="company-${experienceCount}" name="company-${experienceCount}" required>

            <label for="job-duration-${experienceCount}">Duration (e.g., Jan 2020 - Dec 2021):</label>
            <input type="text" id="job-duration-${experienceCount}" name="job-duration-${experienceCount}" required>

            <label for="job-description-${experienceCount}">Job Description:</label>
            <textarea id="job-description-${experienceCount}" name="job-description-${experienceCount}" rows="4" required></textarea>
        `;
        experienceContainer.appendChild(newExperienceEntry);
    };

    const saveFormData = (data: CVFormData) => {
        localStorage.setItem('cv-form-data', JSON.stringify(data));
    };

    const loadFormData = () => {
        const data = localStorage.getItem('cv-form-data');
        if (data) {
            const parsedData: CVFormData = JSON.parse(data);
            (document.getElementById('full-name') as HTMLInputElement).value = parsedData.fullName;
            (document.getElementById('email') as HTMLInputElement).value = parsedData.email;
            (document.getElementById('phone') as HTMLInputElement).value = parsedData.phone;
            (document.getElementById('address') as HTMLInputElement).value = parsedData.address || '';
            (document.getElementById('skills') as HTMLInputElement).value = parsedData.skills;

            // Populate education entries
            parsedData.education.forEach((entry, index) => {
                if (index >= educationCount) addEducationEntry();
                (document.querySelector(`#degree-${index + 1}`) as HTMLInputElement).value = entry.degree;
                (document.querySelector(`#institution-${index + 1}`) as HTMLInputElement).value = entry.institution;
                (document.querySelector(`#year-of-graduation-${index + 1}`) as HTMLInputElement).value = entry.yearOfGraduation.toString();
            });

            // Populate experience entries
            parsedData.experience.forEach((entry, index) => {
                if (index >= experienceCount) addExperienceEntry();
                (document.querySelector(`#job-title-${index + 1}`) as HTMLInputElement).value = entry.jobTitle;
                (document.querySelector(`#company-${index + 1}`) as HTMLInputElement).value = entry.company;
                (document.querySelector(`#job-duration-${index + 1}`) as HTMLInputElement).value = entry.duration;
                (document.querySelector(`#job-description-${index + 1}`) as HTMLTextAreaElement).value = entry.jobDescription;
            });

            // Display profile picture
            const profilePicInput = document.getElementById('profile-pic') as HTMLInputElement;
            if (parsedData.profilePic) {
                const imgElement = document.createElement('img');
                imgElement.src = parsedData.profilePic;
                imgElement.id = 'profile-pic-preview';
                document.querySelector('form')?.insertBefore(imgElement, profilePicInput.nextSibling);
            }
        }
    };

    document.getElementById('add-education')?.addEventListener('click', addEducationEntry);
    document.getElementById('add-experience')?.addEventListener('click', addExperienceEntry);

    document.getElementById('cv-form')?.addEventListener('submit', (event) => {
        event.preventDefault();
    
        const profilePicInput = document.getElementById('profile-pic') as HTMLInputElement;
    
        const formData: CVFormData = {
            fullName: (document.getElementById('full-name') as HTMLInputElement).value,
            email: (document.getElementById('email') as HTMLInputElement).value,
            phone: (document.getElementById('phone') as HTMLInputElement).value,
            address: (document.getElementById('address') as HTMLInputElement).value || undefined,
            education: Array.from(document.querySelectorAll('.education-entry')).map(entry => ({
                degree: (entry.querySelector('input[name^="degree"]') as HTMLInputElement)?.value ?? '',
                institution: (entry.querySelector('input[name^="institution"]') as HTMLInputElement)?.value ?? '',
                yearOfGraduation: parseInt((entry.querySelector('input[name^="year-of-graduation"]') as HTMLInputElement)?.value ?? '0')
            })),
            experience: Array.from(document.querySelectorAll('.experience-entry')).map(entry => ({
                jobTitle: (entry.querySelector('input[name^="job-title"]') as HTMLInputElement)?.value ?? '',
                company: (entry.querySelector('input[name^="company"]') as HTMLInputElement)?.value ?? '',
                duration: (entry.querySelector('input[name^="job-duration"]') as HTMLInputElement)?.value ?? '',
                jobDescription: (entry.querySelector('textarea[name^="job-description"]') as HTMLTextAreaElement)?.value ?? ''
            })),            
            skills: (document.getElementById('skills') as HTMLInputElement).value,
            profilePic: profilePicInput?.files?.[0] ? URL.createObjectURL(profilePicInput.files[0]) : undefined
        };
    
        saveFormData(formData);
        alert('CV data saved to local storage!');
    });
    
    document.getElementById('profile-pic')?.addEventListener('change', (event) => {
        const fileInput = event.target as HTMLInputElement;
        if (fileInput.files?.[0]) {
            const imgElement = document.getElementById('profile-pic-preview') as HTMLImageElement || document.createElement('img');
            imgElement.id = 'profile-pic-preview';
            imgElement.src = URL.createObjectURL(fileInput.files[0]);
            document.querySelector('form')?.insertBefore(imgElement, fileInput.nextSibling);
        }
    });

    loadFormData();
});
