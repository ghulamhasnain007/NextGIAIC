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
}

document.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.querySelector('.sidebar') as HTMLDivElement;
    const mainContent = document.querySelector('.main-content') as HTMLDivElement;

    const loadData = () => {
        const data = localStorage.getItem('cv-form-data');
        if (data) {
            const parsedData: CVFormData = JSON.parse(data);
            
            // Sidebar
            sidebar.querySelector('.name')!.textContent = parsedData.fullName;
            sidebar.querySelector('.contact-info')!.innerHTML = `
                <p>Email: ${parsedData.email}</p>
                <p>Phone: ${parsedData.phone}</p>
                <p>Location: ${parsedData.address || 'N/A'}</p>
            `;

            // Main Content - Experience
            const experienceSection = mainContent.querySelector('section:nth-of-type(1) .timeline')!;
            experienceSection.innerHTML = '';
            parsedData.experience.forEach(exp => {
                const experienceItem = document.createElement('div');
                experienceItem.classList.add('timeline-item', 'fade-in');
                experienceItem.innerHTML = `
                    <h3>${exp.jobTitle}</h3>
                    <span>${exp.company} | ${exp.duration}</span>
                    <p>${exp.jobDescription}</p>
                `;
                experienceSection.appendChild(experienceItem);
            });

            // Main Content - Education
            const educationSection = mainContent.querySelector('section:nth-of-type(2) .timeline')!;
            educationSection.innerHTML = '';
            parsedData.education.forEach(edu => {
                const educationItem = document.createElement('div');
                educationItem.classList.add('timeline-item', 'fade-in');
                educationItem.innerHTML = `
                    <h3>${edu.degree}</h3>
                    <span>${edu.institution} | ${edu.yearOfGraduation}</span>
                `;
                educationSection.appendChild(educationItem);
            });

            // Main Content - Skills
            const skillsSection = mainContent.querySelector('section:nth-of-type(4) .skills')!;
            skillsSection.innerHTML = '';
            parsedData.skills.split(',').forEach(skill => {
                const skillItem = document.createElement('li');
                skillItem.textContent = skill.trim();
                skillItem.classList.add('fade-in');
                skillsSection.appendChild(skillItem);
            });
        }
    };

    loadData();
});
