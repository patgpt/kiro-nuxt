<template>
    <div>
        <PageHero title="About Yellow Dog Construction"
            subtitle="Building excellence with integrity, craftsmanship, and dedication to our clients"
            background-image="/img/about-hero.jpg" :breadcrumbs="[{ name: 'About', path: '/about' }]" />

        <!-- Intro Statement -->
        <section class="py-16">
            <div class="container mx-auto px-4">
                <div class="max-w-4xl mx-auto text-center">
                    <h2 class="text-3xl md:text-4xl font-bold mb-8">Our Story</h2>
                    <div class="prose prose-lg mx-auto">
                        <p class="text-xl leading-relaxed mb-6">
                            Founded in 2008, Yellow Dog Construction has grown from a small local contractor to one of
                            Portland's most trusted construction companies. Our journey began with a simple philosophy:
                            treat every project as if it were our own home, and every client as if they were family.
                        </p>
                        <p class="text-lg leading-relaxed">
                            What started as a two-person operation has evolved into a full-service construction company,
                            but our core values remain unchanged. We believe that quality craftsmanship, honest
                            communication, and unwavering integrity are the foundation of every successful project.
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Mission and Values -->
        <section class="py-16 bg-base-200">
            <div class="container mx-auto px-4">
                <div class="text-center mb-12">
                    <h2 class="text-3xl md:text-4xl font-bold mb-4">Our Mission & Values</h2>
                    <p class="text-lg text-base-content/70 max-w-2xl mx-auto">
                        These core principles guide everything we do, from the smallest repair to the largest
                        construction project.
                    </p>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <FeatureCard v-for="value in values" :key="value.title" :feature="value" variant="primary" />
                </div>
            </div>
        </section>

        <!-- Team Section -->
        <section class="py-16">
            <div class="container mx-auto px-4">
                <div class="text-center mb-12">
                    <h2 class="text-3xl md:text-4xl font-bold mb-4">Meet Our Team</h2>
                    <p class="text-lg text-base-content/70 max-w-2xl mx-auto">
                        Our experienced team of professionals brings decades of combined expertise to every project.
                    </p>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <AuthorCard v-for="member in team" :key="member.name" :author="member" />
                </div>
            </div>
        </section>

        <!-- Company Timeline -->
        <section class="py-16 bg-base-200">
            <div class="container mx-auto px-4">
                <div class="text-center mb-12">
                    <h2 class="text-3xl md:text-4xl font-bold mb-4">Our Journey</h2>
                    <p class="text-lg text-base-content/70 max-w-2xl mx-auto">
                        From humble beginnings to becoming Portland's trusted construction partner.
                    </p>
                </div>

                <div class="max-w-4xl mx-auto">
                    <div class="timeline timeline-vertical">
                        <div v-for="(milestone) in timeline" :key="milestone.year" class="timeline-item">
                            <div class="timeline-start">{{ milestone.year }}</div>
                            <div class="timeline-middle">
                                <div class="w-4 h-4 bg-primary rounded-full" />
                            </div>
                            <div class="timeline-end timeline-box">
                                <h3 class="font-semibold text-lg mb-2">{{ milestone.title }}</h3>
                                <p class="text-base-content/80">{{ milestone.description }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Testimonials -->
        <section class="py-16">
            <div class="container mx-auto px-4">
                <div class="text-center mb-12">
                    <h2 class="text-3xl md:text-4xl font-bold mb-4">What Our Clients Say</h2>
                    <p class="text-lg text-base-content/70 max-w-2xl mx-auto">
                        Don't just take our word for it. Here's what our satisfied clients have to say about working
                        with us.
                    </p>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <Testimonial 
                    v-for="testimonial in testimonials" :key="testimonial.name"
                        :testimonial="testimonial" />
                </div>
            </div>
        </section>

        <!-- CTA Section -->
        <ContactCTA 
        headline="Ready to Work With Us?"
            subheadline="Let's discuss your next construction project and bring your vision to life."
            emotional-hook="Join the hundreds of satisfied clients who have trusted Yellow Dog Construction with their most important projects."
            :primary-c-t-a="{ text: 'Start Your Project', href: '/contact', icon: 'mdi:hammer' }"
            :secondary-c-t-a="{ text: 'Call Us Today', href: 'tel:+15035551234', icon: 'mdi:phone' }"
            phone="+15035551234" email="info@yellowdog.com" location="Portland, Oregon"
            :trust-indicators="['Licensed & Insured', '15+ Years Experience', '500+ Projects Completed', '10-Year Warranty']" />
    </div>
</template>

<script setup lang="ts">
// SEO metadata
useHead({
    title: 'About Us - Yellow Dog Construction',
    meta: [
        { name: 'description', content: 'Learn about Yellow Dog Construction\'s story, mission, values, and experienced team. Serving Portland with quality construction services since 2008.' }
    ]
})

// Company values
const values = [
    {
        title: 'Quality Craftsmanship',
        description: 'We take pride in delivering exceptional workmanship that stands the test of time. Every detail matters to us.',
        icon: 'mdi:hammer-wrench'
    },
    {
        title: 'Honest Communication',
        description: 'Transparency and clear communication are at the heart of every client relationship we build.',
        icon: 'mdi:message-text'
    },
    {
        title: 'Integrity First',
        description: 'We do what we say we\'ll do, when we say we\'ll do it, and we stand behind our work completely.',
        icon: 'mdi:shield-check'
    },
    {
        title: 'Client-Focused',
        description: 'Your vision and satisfaction drive everything we do. We listen, understand, and deliver.',
        icon: 'mdi:account-heart'
    },
    {
        title: 'Safety Priority',
        description: 'The safety of our team, clients, and community is never compromised on any project.',
        icon: 'mdi:hard-hat'
    },
    {
        title: 'Continuous Innovation',
        description: 'We stay current with the latest construction techniques, materials, and sustainable practices.',
        icon: 'mdi:lightbulb-on'
    }
]

// Team members
const team = [
    {
        name: 'Mike Johnson',
        role: 'Founder & CEO',
        company: 'Yellow Dog Construction',
        bio: 'With over 20 years in construction, Mike founded Yellow Dog Construction with a vision to provide honest, quality construction services to the Portland community.',
        avatar: '/img/team-mike.jpg',
        social: [
            { platform: 'linkedin', url: 'https://linkedin.com/in/mikejohnson' }
        ]
    },
    {
        name: 'Sarah Chen',
        role: 'Project Manager',
        company: 'Yellow Dog Construction',
        bio: 'Sarah brings 15 years of project management experience, ensuring every project runs smoothly from start to finish.',
        avatar: '/img/team-sarah.jpg',
        social: [
            { platform: 'linkedin', url: 'https://linkedin.com/in/sarahchen' }
        ]
    },
    {
        name: 'David Rodriguez',
        role: 'Lead Carpenter',
        company: 'Yellow Dog Construction',
        bio: 'David\'s exceptional craftsmanship and attention to detail have made him an invaluable part of our team for over 12 years.',
        avatar: '/img/team-david.jpg'
    },
    {
        name: 'Lisa Thompson',
        role: 'Design Consultant',
        company: 'Yellow Dog Construction',
        bio: 'Lisa helps clients visualize their dreams and turn them into beautiful, functional spaces.',
        avatar: '/img/team-lisa.jpg',
        social: [
            { platform: 'instagram', url: 'https://instagram.com/lisathompsondesign' }
        ]
    },
    {
        name: 'Tom Wilson',
        role: 'Safety Coordinator',
        company: 'Yellow Dog Construction',
        bio: 'Tom ensures every job site meets the highest safety standards, protecting our team and clients.',
        avatar: '/img/team-tom.jpg'
    },
    {
        name: 'Maria Garcia',
        role: 'Client Relations',
        company: 'Yellow Dog Construction',
        bio: 'Maria is your first point of contact and ensures every client feels heard, valued, and informed throughout their project.',
        avatar: '/img/team-maria.jpg'
    }
]

// Company timeline
const timeline = [
    {
        year: '2008',
        title: 'Company Founded',
        description: 'Mike Johnson starts Yellow Dog Construction with a focus on residential remodeling and small commercial projects.'
    },
    {
        year: '2012',
        title: 'Team Expansion',
        description: 'Grew to a team of 8 full-time employees and began taking on larger commercial construction projects.'
    },
    {
        year: '2015',
        title: 'Sustainable Focus',
        description: 'Became certified in green building practices and began specializing in sustainable construction methods.'
    },
    {
        year: '2018',
        title: 'Major Milestone',
        description: 'Completed our 250th project and received the Portland Business Excellence Award for outstanding service.'
    },
    {
        year: '2020',
        title: 'Technology Integration',
        description: 'Implemented advanced project management software and 3D modeling capabilities for better client visualization.'
    },
    {
        year: '2023',
        title: 'Continued Growth',
        description: 'Expanded to 25 team members and opened our new 10,000 sq ft facility to better serve our growing client base.'
    }
]

// Client testimonials
const testimonials = [
    {
        quote: 'Yellow Dog Construction transformed our outdated kitchen into the heart of our home. Their attention to detail and professionalism exceeded our expectations.',
        name: 'Jennifer & Mark Stevens',
        role: 'Homeowners',
        avatar: '/img/testimonial-stevens.jpg',
        project: 'Kitchen Remodel'
    },
    {
        quote: 'Working with Yellow Dog on our office renovation was seamless. They completed the project on time and within budget while maintaining the highest quality standards.',
        name: 'Robert Kim',
        role: 'Business Owner',
        company: 'Kim & Associates',
        avatar: '/img/testimonial-kim.jpg',
        project: 'Office Renovation'
    },
    {
        quote: 'From the initial consultation to the final walkthrough, Yellow Dog Construction demonstrated why they are Portland\'s premier construction company.',
        name: 'Amanda Foster',
        role: 'Property Developer',
        company: 'Foster Development',
        avatar: '/img/testimonial-foster.jpg',
        project: 'Multi-Unit Development'
    }
]
</script>