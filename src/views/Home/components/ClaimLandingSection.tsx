import React from 'react'
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Grid,
    Box,
    Typography,
    TextField,
} from '@mui/material'
import { BiBot, BiGlobe, BiMessageSquare, BiTrendingUp } from 'react-icons/bi'
import { Button } from '@/components/ui'
import { CgLock } from 'react-icons/cg'
import { FaUsers } from 'react-icons/fa'
import { LuBuilding2 } from 'react-icons/lu'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'

const ClaimLandingSection: React.FC = () => {
    const [expandedPanels, setExpandedPanels] = React.useState<string[]>([])

    const handleChange =
        (panel: string) =>
        (event: React.SyntheticEvent, isExpanded: boolean) => {
            if (isExpanded) {
                setExpandedPanels((prev) => [...prev, panel])
            } else {
                setExpandedPanels((prev) => prev.filter((p) => p !== panel))
            }
        }

    const features = [
        {
            id: 'panel1',
            icon: <BiGlobe size={28} color="#3f51b5" />,
            title: 'Online Website With AI Agent',
            description: 'Intelligent digital presence',
            expandedDescription:
                'Intelligent digital presence with 24/7 AI-powered support that guides patients, answers FAQs, and pre-qualifies leads automatically.',
        },
        {
            id: 'panel2',
            icon: <LuBuilding2 size={28} color="#3f51b5" />,
            title: 'Build Digital Business',
            description: 'Scale your operations',
            expandedDescription:
                'Scale your operations seamlessly: manage bookings, team calendars, and payment workflows all in one place, with zero coding required.',
        },
        {
            id: 'panel3',
            icon: <BiMessageSquare size={28} color="#3f51b5" />,
            title: 'Patient Conversation',
            description: 'Seamless communication',
            expandedDescription:
                'One unified inbox for messages, SMS, and chat—never lose a patient request again. Automate reminders and follow-ups for higher retention.',
        },
        {
            id: 'panel4',
            icon: <BiTrendingUp size={28} color="#3f51b5" />,
            title: 'Boost Revenue',
            description: 'Increase your earnings',
            expandedDescription:
                'Optimize your services with data-driven upsells, appointment packages, and targeted campaigns to boost average order value by up to 30%.',
        },
        {
            id: 'panel5',
            icon: <FaUsers size={28} color="#3f51b5" />,
            title: 'Lead Generation Support',
            description: 'Convert visitors to clients',
            expandedDescription:
                'Capture and segment leads automatically, then nurture them with drip campaigns and targeted content—turn more site visitors into paying patients.',
        },
        {
            id: 'panel6',
            icon: <CgLock size={28} color="#3f51b5" />,
            title: '24/7 Support for Patient',
            description: 'Round-the-clock assistance',
            expandedDescription:
                'Always-on support AI handles routine queries, escalates urgent issues, and frees up your team to focus on clinical care when it matters most.',
        },
    ]

    return (
        <Box className="bg-slate-300 py-16">
            <Box maxWidth="lg" mx="auto" px={2}>
                {/* Features Grid */}
                <Grid container spacing={3} mb={8}>
                    {features.map((feature) => (
                        <Grid item xs={12} sm={6} md={4} key={feature.id}>
                            <Accordion
                                expanded={expandedPanels.includes(feature.id)}
                                onChange={handleChange(feature.id)}
                                disableGutters
                                elevation={3}
                                square={false}
                                sx={{
                                  borderRadius: '25px', 
                                    overflow: 'hidden', 
                                }}
                            >
                                <AccordionSummary
                                    aria-controls={`${feature.id}-content`}
                                    id={`${feature.id}-header`}
                                    sx={{
                                        flexDirection: 'column',
                                        alignItems: 'flex-start',
                                    }}
                                >
                                    <Box
                                        display="flex"
                                        flexDirection="column"
                                        alignItems="center"
                                        justifyContent="space-between"
                                        width="100%"
                                    >
                                        <Box
                                            display="flex"
                                            alignItems="center"
                                            justifyContent="space-between"
                                            width="100%"
                                        >
                                            <Box
                                                display="flex"
                                                alignItems="center"
                                                gap={2}
                                            >
                                                <Box
                                                    bgcolor="#e8eaf6"
                                                    p={1}
                                                    borderRadius="12px"
                                                >
                                                    {feature.icon}
                                                </Box>
                                                <Typography
                                                    variant="h6"
                                                    color="textPrimary"
                                                >
                                                    {feature.title}
                                                </Typography>
                                            </Box>
                                            {expandedPanels.includes(
                                                feature.id,
                                            ) ? (
                                                <ExpandLessIcon />
                                            ) : (
                                                <ExpandMoreIcon />
                                            )}
                                        </Box>
                                        <Box mt={1} width="100%">
                                            <Typography
                                                variant="body2"
                                                color="textSecondary"
                                            >
                                                {feature.description}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </AccordionSummary>
                                <AccordionDetails sx={{ p: 2, pt: 0 }}>
                                    <Typography
                                        variant="body2"
                                        color="textSecondary"
                                    >
                                        {feature.expandedDescription}
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                        </Grid>
                    ))}
                </Grid>

                {/* Main Content */}
                <Box
                    textAlign="center"
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    gap={4}
                    border={4}
                    borderColor="white"
                    p={4}
                    borderRadius="25px"
                >
                    <Box bgcolor="primary.main" p={2} borderRadius="50%">
                        <BiBot size={48} color="#fff" />
                    </Box>
                    <Box maxWidth="sm">
                        <Typography variant="h4" fontWeight="bold" mb={2}>
                            Claim Your Digital Front Office (Website)
                        </Typography>
                        <Typography variant="h6" color="textSecondary" mb={4}>
                            Use powerful AI to transform your online presence
                            and automate patient interactions
                        </Typography>
                    </Box>
                    <Box width="100%" maxWidth="400px">
                        <TextField
                            fullWidth
                            disabled
                            placeholder="GoGetWell.ai/your_name"
                            variant="outlined"
                            sx={{ mb: 2 }}
                        />
                        <Button
                            block
                            variant="solid"
                            className="rounded-full max-w-[300px] bg-slate-800 hover:bg-[#01052f] outline outline-white text-white"
                        >
                            Join the Waiting List
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default ClaimLandingSection
