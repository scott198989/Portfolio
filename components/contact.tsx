'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Mail, MapPin, Linkedin, Github, Send, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';

const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: 'scott198989@gmail.com',
    href: 'mailto:scott198989@gmail.com',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Clarksville, TN',
    href: null,
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: 'scott-tuschl',
    href: 'https://www.linkedin.com/in/scott-tuschl/',
  },
  {
    icon: Github,
    label: 'GitHub',
    value: 'scott198989',
    href: 'https://github.com/scott198989',
  },
];

export default function Contact() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="contact" ref={ref} className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center space-y-4 max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold">
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            I'm always interested in discussing new opportunities, collaborations, or just talking about engineering!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Contact Info Cards */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            <Card className="glass-strong">
              <CardHeader>
                <CardTitle className="text-2xl">Let's Connect</CardTitle>
                <CardDescription className="text-base">
                  Feel free to reach out through any of these channels
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={info.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  >
                    {info.href ? (
                      <a
                        href={info.href}
                        target={info.href.startsWith('http') ? '_blank' : undefined}
                        rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="flex items-center gap-4 p-4 rounded-lg bg-background/50 hover:bg-background/70 transition-all group"
                      >
                        <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                          <info.icon className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-muted-foreground">{info.label}</p>
                          <p className="font-medium group-hover:text-primary transition-colors">
                            {info.value}
                          </p>
                        </div>
                        {info.href.startsWith('http') && (
                          <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                        )}
                      </a>
                    ) : (
                      <div className="flex items-center gap-4 p-4 rounded-lg bg-background/50">
                        <div className="p-3 rounded-lg bg-primary/10">
                          <info.icon className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-muted-foreground">{info.label}</p>
                          <p className="font-medium">{info.value}</p>
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="glass-strong border-primary/20">
              <CardHeader>
                <CardTitle>Available For</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <div className="h-2 w-2 rounded-full bg-green-400" />
                  <span>Full-time Process Engineering Roles</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="h-2 w-2 rounded-full bg-green-400" />
                  <span>Engineering Internships</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="h-2 w-2 rounded-full bg-green-400" />
                  <span>Consulting Projects</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="h-2 w-2 rounded-full bg-green-400" />
                  <span>Collaborative Research</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* CTA Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card className="glass-strong h-full flex flex-col justify-between">
              <CardHeader>
                <CardTitle className="text-2xl">Ready to Work Together?</CardTitle>
                <CardDescription className="text-base">
                  Whether you're looking for a dedicated process engineer, need automation expertise,
                  or want to discuss an exciting project, I'd love to hear from you.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-lg">What I Bring:</h4>
                  <ul className="space-y-3">
                    {[
                      'Mechatronics engineering expertise',
                      'Process optimization & automation',
                      'Data-driven decision making',
                      'Cross-functional leadership',
                      'Continuous improvement mindset',
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-3 pt-4">
                  <Button
                    variant="glow"
                    size="lg"
                    className="w-full group"
                    asChild
                  >
                    <a href="mailto:scott198989@gmail.com">
                      <Mail className="mr-2 h-5 w-5" />
                      Send Me an Email
                      <Send className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </Button>

                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full"
                    asChild
                  >
                    <a
                      href="https://www.linkedin.com/in/scott-tuschl/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Linkedin className="mr-2 h-5 w-5" />
                      Connect on LinkedIn
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="text-center mt-16 pt-8 border-t border-border"
        >
          <p className="text-sm text-muted-foreground">
            © 2025 Scott Tuschl. Built with Next.js, React, and Three.js.
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            Designed for impact. Engineered for excellence.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
