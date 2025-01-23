import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useRouter } from 'expo-router';
import { ImageSourcePropType } from 'react-native';

interface Vaccine {
  name: string;
  description: string[];
  benefits: string[];
  consequences: string[];
  image: ImageSourcePropType;
  age: string;
  type: string;
  modeOfAdministration: string;

}

const vaccineDetails: Record<string, Vaccine> = {
  '1': {
    name: 'BCG Vaccine',
    description:[ 
      'The BCG vaccine is a live attenuated vaccine derived from a strain of Mycobacterium bovis. It is primarily used to protect against tuberculosis (TB), a potentially severe bacterial infection that primarily affects the lungs but can also spread to other parts of the body such as the brain, spine, and kidneys.', 
      'The vaccine is most effective in protecting children against severe forms of TB, such as TB meningitis (an infection of the brain lining) and miliary TB (a rare, widespread form of TB). It is less effective in preventing pulmonary TB in adults but remains an essential part of childhood immunization programs, especially in countries where TB is prevalent.',

    ],
    benefits: [
      'Reduces the risk of severe TB in children',
      'Long-term protection against TB',
      'Essential for children in high-risk areas',
      'Reduces severe TB cases: Especially TB meningitis and miliary TB in children.',
      'Cost-effective: A vital part of national immunization programs in TB-endemic areas.',
      'Widespread availability: Globally recommended in regions with high TB incidence.'
    ],
    consequences: [
      'Increased susceptibility to tuberculosis',
      'Higher risk of severe TB illness',
      'Potential for long-term respiratory issues',
      'Localized reaction: A small red bump at the injection site that may turn into a sore or ulcer, healing over several weeks or months.',
      'Scar formation: A small scar typically develops at the injection site.',
      'Lymphadenopathy: Swollen lymph nodes near the injection site in rare cases.',
      'Severe adverse reactions are extremely rare but may include disseminated BCG infection in individuals with compromised immune systems.',
    ],
    image: require('../../assets/images/bcg.jpg'),
    age: 'At Birth',
    type: 'Live Attenuated Vaccine',
    modeOfAdministration: 'Intracutaneous Injection',
  },
  '2': {
    name: 'Polio Vaccine (OPV)',
    description: [
      'The Oral Polio Vaccine (OPV) is a live attenuated vaccine designed to protect against poliomyelitis, a highly contagious viral infection caused by the poliovirus. Polio primarily affects children under the age of 5, potentially leading to irreversible paralysis or death. OPV is a cornerstone in global polio eradication efforts due to its ability to provide immunity and prevent community transmission of the virus.',
      'OPV contains weakened poliovirus strains that stimulate the immune system without causing the disease. It is particularly effective in developing gut immunity, which blocks the virus from spreading through fecal-oral contamination.',
    ],
    benefits: [
      'Prevents polio-related disabilities',
      'Protects future generations',
      'Part of routine immunization schedules',
      'Prevents polio transmission: Strong intestinal immunity interrupts virus spread in communities.',
      'Cost-effective: Affordable and suitable for mass immunization campaigns.',
      'Ease of Use: Requires no needles or healthcare infrastructure for administration.',
      'Supports Herd Immunity: Protects unvaccinated individuals by reducing the presence of the virus in the environment.',
    ],
    consequences: [
      'Increased risk of paralysis',
      'Potential outbreak of polio in the community',
      'Long-term health complications',
      'Mild gastrointestinal upset: Loose stools or mild nausea.',
      'Rare complications: Vaccine-associated paralytic poliomyelitis (VAPP) occurs in approximately 1 in 2.7 million doses.',
    ],
    image: require('../../assets/images/polio-1dose.jpg'),
    age: 'At Birth',
    type: 'Live Attenuated Vaccine',
    modeOfAdministration: 'Oral (administered as drops).',
  },
  '3': {
    name: 'Hepatitis B Vaccine (First Dose)',
    description: [
      'The Hepatitis B vaccine protects against infection caused by the Hepatitis B virus (HBV), which primarily attacks the liver. HBV can lead to both acute and chronic liver conditions, including cirrhosis and liver cancer. The vaccine is one of the first immunizations given to newborns and is a critical part of the global strategy to eliminate HBV. The vaccine is made using recombinant DNA technology, where non-infectious parts of the virus (surface antigens) are used to stimulate the immune system without causing the disease. Administering the vaccine at birth provides immediate protection to the newborn, especially in cases where the mother is an HBV carrier.'
    ],
    benefits: [
      'Prevents chronic liver disease',
      'Reduces risk of liver cancer',
      'Part of routine immunization schedules',
    ],
    consequences: [
      'Prevents Chronic Liver Disease: Reduces the risk of chronic HBV infection, which is a major cause of liver cirrhosis and cancer.',
      'Early Protection: Protects newborns who may acquire HBV from infected mothers.',
      'Increased risk of chronic Hepatitis B infection',
      'Higher chance of liver disease',
      'Potentially life-threatening complications',
    ],
    image: require('../../assets/images/hepatitis-b.jpg'),
    age: 'At Birth',
        type: 'Live Attenuated Vaccine',
    modeOfAdministration: 'Intracutaneous Injection',
  },
  '4': {
    name: 'Polio Vaccine (OPV)',
    description: [
      'The Polio Vaccine (Oral Polio Vaccine, OPV) protects against poliomyelitis, a highly contagious viral disease caused by the poliovirus. Polio primarily affects young children and can lead to permanent paralysis or even death in severe cases.',
      'The OPV contains a weakened form of the poliovirus that cannot cause the disease but is strong enough to stimulate the immune system to build immunity. It is part of the global effort to eradicate polio, making it a cornerstone of immunization campaigns in many countries.'
    ],
    benefits: [
      'Prevents Polio-Related Disabilities: Immunization with OPV prevents paralysis and long-term disabilities caused by the poliovirus.',
      'Protects Future Generations: Contributes to the eradication of polio, ensuring children in the future will not suffer from this disease.',
      'Ease of Administration: OPV does not require needles, making it more accessible in resource-limited settings.',
    ],
    consequences: [
      'Increased Risk of Paralysis: Without immunization, individuals are at risk of permanent paralysis caused by polio.',
      'Higher Risk of Polio Outbreaks: Unvaccinated communities are vulnerable to outbreaks.',
      'Potentially Life-Threatening Complications: Polio can lead to respiratory failure in severe cases.',
    ],
    image: require('../../assets/images/polio-1dose.jpg'),
    age: '6 Weeks',
        type: 'Live Attenuated Vaccine',
    modeOfAdministration: 'Oral administration (OPV is typically given as drops in the mouth)',
  },
  '5': {
    name: 'DTP (Diphtheria, Tetanus, Pertussis)',
    description: [
      'Protects against diphtheria, tetanus, and pertussis (whooping cough), bacterial infections that can be life-threatening.',
      'Diphtheria: A bacterial infection that affects the mucous membranes of the throat and nose, potentially leading to severe breathing difficulties, heart problems, and nerve damage.',
      'Tetanus: Also known as "lockjaw," this infection causes painful muscle stiffness and spasms, which can interfere with breathing and result in death.',
      'Pertussis (Whooping Cough): A highly contagious respiratory infection characterized by severe coughing spells that can cause breathing difficulties, particularly in infants.',
    ],
    benefits: [
      'Prevents Severe Respiratory Issues: Protects against the severe respiratory complications caused by diphtheria and pertussis.',
      'Reduces Risk of Fatal Complications: Prevents potentially fatal outcomes such as tetanus-induced muscle paralysis and pertussis-related pneumonia.',
      'Community Immunity: Protects individuals who cannot be vaccinated, such as newborns and those with compromised immune systems.',
    ],
    consequences: [
      'Increased Risk of Severe Illness: Vulnerability to life-threatening infections such as tetanus or pertussis.',
      'Higher Chances of Complications: Diphtheria can lead to heart damage, while pertussis can cause brain damage in severe cases.',
      'Outbreak Potential: Unvaccinated communities are at higher risk of outbreaks, particularly of pertussis.',
    ],
    image: require('../../assets/images/dtp-6.jpg'),
    age: '6 Weeks',
        type: 'Combination vaccine containing inactivated toxins and bacterial components (not a live attenuated vaccine).',
    modeOfAdministration: 'Intracutaneous Injection',
  },
  '6': {
    name: 'Hib (Haemophilus influenzae type b)',
    description: [
      'The Hib vaccine provides protection against Haemophilus influenzae type b, a bacterium responsible for severe and potentially life-threatening infections, particularly in young children under the age of 5.',
      'Meningitis: Inflammation of the membranes surrounding the brain and spinal cord, which can lead to brain damage or death.',
      'Pneumonia: Severe lung infection that impairs breathing.',
      'Sepsis: A life-threatening infection of the blood.',
      'The vaccine plays a critical role in reducing childhood mortality and is an essential part of routine immunization schedules worldwide.'
    ],
    benefits: [
      'Prevents Severe Illnesses: Protects against life-threatening conditions such as meningitis, pneumonia, and sepsis caused by Hib.',
      'Improves Child Survival Rates: Reduces childhood mortality due to invasive bacterial infections.',
      'Part of Routine Immunization: Integrated into global immunization schedules, ensuring widespread protection.',
    ],
    consequences: [
      'Increased Risk of Severe Bacterial Infections: Unvaccinated children are at high risk of contracting invasive Hib diseases.',
      'Potential for Disability: Survivors of Hib meningitis may suffer long-term complications, including hearing loss and brain damage.',
      'Higher Mortality Rates: Hib infections can be fatal, especially in resource-limited settings.',
    ],
    image: require('../../assets/images/hib.jpg'),
    age: '6 Weeks',
        type: 'Conjugate vaccine (not a live attenuated vaccine)',
    modeOfAdministration: 'Intramuscular injection (not intracutaneous',
  },
  '7': {
    name: 'Hepatitis B Vaccine (Second Dose)',
    description: [
      'The second dose of the Hepatitis B vaccine is a critical step in building immunity against the Hepatitis B virus (HBV). HBV is a dangerous virus that primarily attacks the liver and can lead to severe conditions such as chronic liver disease, cirrhosis, and liver cancer.',
      "Administering the second dose as part of the recommended schedule strengthens the body's immune response initiated by the first dose. It ensures higher levels of protection and reinforces immunity to prevent HBV infections.",
    ],
    benefits: [
      'Provides stronger protection against Hepatitis B',
      'Strengthens Immunity: Enhances the immune response initiated by the first dose.',
      'Prevents Chronic Liver Disease: Protects against complications like cirrhosis and liver cancer caused by HBV.',
      'Early Protection: Safeguards infants during a vulnerable period in their lives.',
      'Global Impact: Reduces the burden of liver disease and contributes to the global elimination of HBV.,',
    ],
    consequences: [
      'Weakened Immunity: Without the second dose, the immunity generated by the first dose may not be sufficient.',
      'Higher Risk of HBV Infection: Increases susceptibility to HBV infections and related complications, such as chronic liver damage and cancer.',
      'Missed Opportunity for Lifelong Protection: The complete vaccine series is necessary for lifelong immunity.',
    ],
    image: require('../../assets/images/hepatitis-b.jpg'),
    age: '6 Weeks',
    type: 'Recombinant vaccine.',
    modeOfAdministration: 'Intramuscular injection.',
  },
  '8': {
    name: 'PCV (Pneumococcal Conjugate Vaccine)',
    description: [
      'The Pneumococcal Conjugate Vaccine (PCV) is designed to protect against infections caused by Streptococcus pneumoniae (pneumococcus), a bacterium responsible for severe illnesses such as pneumonia, meningitis, and sepsis, especially in children under the age of five.',
      'This vaccine uses a conjugate mechanism, where pieces of the pneumococcal bacteria are attached to a harmless protein. This enhances the body’s immune response, making it more effective, particularly in young children whose immune systems are still developing.',
      'PCV is a cornerstone of pediatric immunization schedules worldwide, significantly reducing childhood mortality and morbidity caused by pneumococcal diseases.',    
      ],
    benefits: [
      'Prevents Severe Infections: Protects against life-threatening diseases like pneumonia, meningitis, and bloodstream infections.',
      'Reduces Complications: Minimizes long-term complications such as brain damage or hearing loss from meningitis.',
      'Lowers Mortality Rates: Saves millions of lives, particularly in children under five.',
      'Herd Immunity: Reduces the spread of pneumococcus in the community, indirectly protecting unvaccinated individuals.'
      ],
    consequences: [
      'Increased risk of respiratory diseases',
      'Increased Risk of Pneumococcal Diseases: Leads to serious conditions such as pneumonia, sepsis, and meningitis.',
      'High Mortality Rates: Pneumococcal infections are a leading cause of death among young children globally.',
      'Long-Term Health Issues: Survivors of severe infections may experience complications like hearing loss, developmental delays, or chronic lung conditions.',
    ],
    image: require('../../assets/images/pcv.jpg'),
    age: '6 Weeks',
    type: 'Conjugate vaccine.',
    modeOfAdministration: 'Intramuscular injection.',
  },
  '9': {
    name: 'RV (Rotavirus Vaccine)',
    description: [
      'The Rotavirus Vaccine (RV) is designed to protect against rotavirus, a highly contagious virus that causes severe diarrhea, vomiting, fever, and dehydration, particularly in infants and young children. Rotavirus is a leading cause of severe diarrhea-related hospitalizations and deaths globally, especially in low-resource settings.',
      'The vaccine contains a weakened form of the rotavirus that cannot cause severe illness. It stimulates the immune system to recognize and fight the virus during future exposures.',
    ],
    benefits: [
      'Prevents Severe Diarrhea: Protects against one of the most common causes of diarrhea in children.',
      'Reduces Hospitalizations: Decreases the need for medical care, especially in resource-limited areas.',
      'Protects Against Dehydration: Prevents life-threatening dehydration caused by rotavirus-induced diarrhea.',
      'Community Immunity: Limits the spread of the virus, indirectly protecting unvaccinated children.',
    ],
    consequences: [
      'Increased Risk of Severe Diarrhea: Leads to dehydration, hospitalization, and potentially death.',
      'Higher Mortality Rates: Rotavirus is a leading cause of death in children under five globally, especially in areas with poor access to clean water and healthcare.',
      'Economic Burden: Increased costs for families and healthcare systems due to hospitalization and treatment.            ',
    ],
    image: require('../../assets/images/rotavirus.jpg'),
    age: '6 Weeks',
        type: 'Live Attenuated Vaccine',
    modeOfAdministration: 'Oral drops.',
  },
  // Continue for the rest of the entries following the same pattern
  '10': {
    name: 'Polio Vaccine (OPV)',
    description: [
      'The Oral Polio Vaccine (OPV) protects against poliomyelitis, a highly infectious viral disease caused by the poliovirus. Poliovirus can invade the nervous system, potentially causing irreversible paralysis or even death. OPV is a critical tool in global efforts to eradicate polio due to its safety, efficacy, and ability to induce strong immunity both in the vaccinated individual and within the community.',
      'The vaccine contains weakened poliovirus strains that stimulate the immune system without causing severe disease. OPV provides immunity in the intestines, where poliovirus replicates, thus reducing its spread in the community.',
    ],
    benefits: [
      'Prevents Poliomyelitis: Protects children from paralysis caused by the poliovirus.',
      'Community Protection: Reduces virus shedding and transmission, helping unvaccinated individuals.',
      'Supports Eradication Efforts: Plays a pivotal role in making polio eradication possible worldwide.',
      'Ease of Administration: Oral delivery makes it convenient and painless for children.',

    ],
    consequences: [
      'Increased Risk of Paralysis: Poliovirus can cause irreversible paralysis in children.',
      'Higher Mortality Risk: Severe cases can lead to breathing difficulties and death.',
      'Continued Virus Circulation: Without widespread vaccination, poliovirus can continue to spread and cause outbreaks.',
        ],
    image: require('../../assets/images/polio-1dose.jpg'),
    age: '10 Weeks',
        type: 'Live Attenuated Vaccine',
    modeOfAdministration: 'Oral drops.',
  },
  '11': {
    name: 'DTP (Diphtheria, Tetanus, Pertussis)',
    description: [
      'The DTP vaccine protects against three serious bacterial infections:',
      'Diphtheria: A respiratory illness caused by Corynebacterium diphtheriae, which produces a toxin leading to severe throat infections, breathing difficulties, and potential heart or nerve damage.',
      'Tetanus: Also called "lockjaw," tetanus is caused by Clostridium tetani, a bacterium that enters the body through wounds and produces a toxin that causes painful muscle stiffness and spasms.',
      'Pertussis (Whooping Cough): Caused by Bordetella pertussis, this highly contagious disease affects the respiratory system, leading to severe coughing fits that can be life-threatening in infants.',
      'The second dose of the DTP vaccine strengthens the immune response initiated by the first dose, ensuring long-lasting protection against these diseases.      ',
    ],
    benefits: [
      'Prevents Severe Respiratory and Neurological Complications: Reduces the risk of life-threatening conditions like airway obstruction (diphtheria), muscle rigidity (tetanus), and pneumonia (pertussis).',
      'Boosts Community Immunity: Widespread vaccination protects those who cannot receive the vaccine, such as infants under six weeks old.',
      'Supports Public Health Goals: Critical for maintaining control over these diseases globally.', 
    ],
    consequences: [
      'Increased Risk of Severe Illness: Higher likelihood of contracting diphtheria, tetanus, or pertussis.',
      'Complications:',
      'Diphtheria: Throat blockages, heart failure, or nerve damage.',
      'Tetanus: Painful muscle spasms leading to fractures or respiratory failure.',
      'Pertussis: Pneumonia, brain damage, or death in severe cases, especially in infants.      ',
    ],
    image: require('../../assets/images/dtp-6.jpg'),
    age: '10 Weeks',
    type: 'Conbination vaccine containing: Diphtheria toxiod, Tetanus toxoid, Accellar pertussis antigens',
    modeOfAdministration: 'Intramuscular injection',
  },
  '12': {
    name: 'Hib (Haemophilus influenzae type b) Second does',
    description: [
      'The Hib vaccine protects against Haemophilus influenzae type b (Hib), a bacterium that can cause life-threatening illnesses in young children, such as:',
      'Meningitis: A severe infection of the protective membranes covering the brain and spinal cord, leading to neurological damage or death.',
      'Pneumonia: A lung infection that impairs breathing and oxygen exchange.',
      'Epiglottitis: A life-threatening swelling of the throat that can block the airway.',
      'Sepsis: A dangerous infection that spreads throughout the bloodstream.',
      'Hib was once a leading cause of childhood bacterial infections, but vaccination has dramatically reduced its prevalence.      ',
    ],
    benefits: [
      'Prevents Serious Illnesses: Reduces the risk of meningitis, pneumonia, and other life-threatening conditions caused by Hib.',
      'Protects Vulnerable Children: Provides immunity to infants and young children, who are most at risk.',
      'Supports Global Public Health Goals: Contributes to the elimination of Hib-related diseases worldwide.      ',
    ],
    consequences: [
      'Increased Risk of Severe Infections: Unvaccinated children are more likely to develop meningitis, pneumonia, or epiglottitis.',
      'Higher Mortality Rates: Hib infections can be fatal if untreated.',
      'Long-Term Complications: Survivors of Hib meningitis may face permanent hearing loss or developmental delays.      ',
    ],
    image: require('../../assets/images/hib.jpg'),
    age: '10 Weeks',
    type: 'Conjugate vaccine.',
    modeOfAdministration: 'Intramuscular injection.',
  },
  '13': {
    name: 'PCV (Pneumococcal Conjugate Vaccine) Second does',
    description: [
      'The Pneumococcal Conjugate Vaccine (PCV) protects against infections caused by Streptococcus pneumoniae, commonly known as pneumococcus. This bacterium can cause a range of serious and sometimes fatal illnesses, including:',
      'Pneumonia: A lung infection that can lead to difficulty breathing and oxygen deprivation.',
      'Meningitis: A severe infection of the membranes surrounding the brain and spinal cord, potentially causing permanent brain damage or death.',
      'Sepsis: A life-threatening blood infection that can result in organ failure.',
      'Otitis Media: A common middle ear infection that can cause hearing loss if untreated.',
      'Children under 2 years of age and older adults are at the highest risk of pneumococcal infections, making PCV a critical part of routine immunization schedules.    ',
    ],
    benefits: [
      'Prevents Life-Threatening Illnesses: Protects against meningitis, sepsis, and pneumonia caused by pneumococcus.',
      'Reduces Antimicrobial Resistance: Prevents infections that would otherwise require antibiotics, helping to combat antibiotic resistance.',
      'Protects Vulnerable Populations: Provides immunity to young children, who are most susceptible to severe pneumococcal infections.',
      'Supports Public Health Goals: Contributes to the global reduction of pneumococcal disease-related deaths, particularly in developing countries.',

    ],
    consequences: [
      'Higher Risk of Severe Illness: Unvaccinated individuals are more likely to develop invasive pneumococcal diseases.',
      'Increased Mortality Rates: Pneumococcal infections are a leading cause of vaccine-preventable deaths in children under 5.',
      'Long-Term Complications: Survivors of pneumococcal meningitis may suffer from permanent hearing loss, neurological disabilities, or developmental delays.',
    ],
    image: require('../../assets/images/pcv.jpg'),
    age: '10 Weeks',
    type: 'Conjugate vaccine.',
    modeOfAdministration: 'Intramuscular injection',
  },
  '14': {
    name: 'RV (Rotavirus Vaccine)',
    description: [
      'The Rotavirus Vaccine (RV) is designed to protect against rotavirus, a highly contagious virus that causes severe diarrhea, vomiting, fever, and dehydration, particularly in infants and young children. Rotavirus is a leading cause of severe diarrhea-related hospitalizations and deaths globally, especially in low-resource settings.',
      'The vaccine contains a weakened form of the rotavirus that cannot cause severe illness. It stimulates the immune system to recognize and fight the virus during future exposures.',
    ],
    benefits: [
      'Prevents Severe Diarrhea: Protects against one of the most common causes of diarrhea in children.',
      'Reduces Hospitalizations: Decreases the need for medical care, especially in resource-limited areas.',
      'Protects Against Dehydration: Prevents life-threatening dehydration caused by rotavirus-induced diarrhea.',
      'Community Immunity: Limits the spread of the virus, indirectly protecting unvaccinated children.',
    ],
    consequences: [
      'Increased Risk of Severe Diarrhea: Leads to dehydration, hospitalization, and potentially death.',
      'Higher Mortality Rates: Rotavirus is a leading cause of death in children under five globally, especially in areas with poor access to clean water and healthcare.',
      'Economic Burden: Increased costs for families and healthcare systems due to hospitalization and treatment.            ',
    ],
    image: require('../../assets/images/rotavirus.jpg'),
    age: '6 Weeks',
        type: 'Live Attenuated Vaccine',
    modeOfAdministration: 'Oral drops.',
  },
  '15': {
    name: 'Polio Vaccine (OPV) Third does',
    description: [
      'The Oral Polio Vaccine (OPV) is designed to protect against poliomyelitis (polio), a highly contagious viral infection that can lead to paralysis or even death. Polio primarily affects children under five years old and can cause permanent disability, including paralysis, in the affected limbs. The OPV is an effective tool in eradicating polio worldwide and is part of global vaccination programs, especially in regions where the disease still exists.',
      'The vaccine contains weakened (attenuated) poliovirus strains that help the body build immunity without causing the disease. OPV is often used in mass immunization campaigns because it is easy to administer and can lead to "herd immunity," where vaccination of a large portion of the population provides indirect protection to those who are not vaccinated.      ',
    ],
    benefits: [
      'Prevents Polio Paralysis: The most significant benefit of OPV is its ability to prevent poliomyelitis, a debilitating disease that can cause lifelong paralysis or death.',
      'Eradication of Polio: OPV plays a vital role in the global effort to eradicate polio, contributing to a significant decline in cases worldwide.',
      'Easy Administration: The oral form of the vaccine makes it easier to administer in mass immunization campaigns, especially in areas where healthcare infrastructure is limited.',
      'Provides Community Immunity: OPV helps establish herd immunity by reducing the spread of the virus in communities, ultimately protecting the unvaccinated population.',
    ],
    consequences: [
      'Increased Risk of Polio Infection: Without vaccination, children are at risk of contracting polio, which can lead to paralysis and, in some cases, death.',
      'Spread of the Virus: Unvaccinated individuals can become carriers of the virus and contribute to outbreaks, potentially leading to more widespread cases.',
      'Long-Term Disability: Poliovirus can cause irreversible paralysis, primarily in the lower limbs, leaving affected individuals with permanent disability.',
      'Rebound of Polio Cases: If immunization rates drop, the risk of polio re-emergence becomes a concern, particularly in regions where the virus has been eliminated but remains present elsewhere.',
    ],
    image: require('../../assets/images/polio-1dose.jpg'),
    age: '14 Weeks',
        type: 'Oral Polio Vaccine (OPV) – Live Attenuated Vaccine',
    modeOfAdministration: 'Oral (taken by mouth).',
  },
  '16': {
    name: 'DTP (Diphtheria, Tetanus, Pertussis) Third does',
    description: [
      'The DTP vaccine is a combination vaccine that provides protection against three serious bacterial infections: diphtheria, tetanus, and pertussis (whooping cough). These diseases can cause severe illness and even death, particularly in young children.',
      'Diphtheria: A bacterial infection that affects the throat and airways, leading to breathing difficulties, heart problems, and nerve damage.',
      'Tetanus: Caused by bacteria that enter the body through wounds, leading to painful muscle stiffness and spasms. Severe cases can cause breathing issues and death.',
      'Pertussis (Whooping Cough): A highly contagious bacterial infection causing severe coughing fits that can lead to pneumonia, brain damage, and death, especially in infants.',
      'The DTP vaccine is a cornerstone of routine immunization programs globally and has significantly reduced illness and death rates associated with these diseases.        ',
    ],
    benefits: [
      'Prevents Severe Illness: Protects children from life-threatening infections like diphtheria, tetanus, and pertussis.',
      'Reduces Complications: Minimizes the risk of complications such as pneumonia, muscle paralysis, or brain damage caused by these diseases.',
      'Contributes to Herd Immunity: Protects communities by reducing the spread of pertussis, which is highly contagious.',
      'Global Impact: Significant reduction in deaths and disabilities caused by these diseases worldwide.',
    ],
    consequences: [
      'Diphtheria:',
      'Breathing difficulties, heart problems, and possible death.',
      'Tetanus:',
      'Muscle stiffness, lockjaw, severe spasms, and high fatality rates in unvaccinated individuals.',
      'Pertussis:',
      'Severe coughing fits, pneumonia, seizures, and brain damage, particularly in infants.',
      'Without vaccination, children are at a high risk of severe illness and death from these diseases.      ',
    ],
    image: require('../../assets/images/dtp-6.jpg'),
    age: '14 Weeks',
        type: 'Inactivated vaccine (components of the pathogens are used to stimulate immunity).',
    modeOfAdministration: 'Intramuscular injection.',
  },
  '17': {
    name: 'Hib (Haemophilus influenzae type b) Third does',
    description: [
      'The Hib vaccine protects against Haemophilus influenzae type b, a bacterium that causes severe illnesses, especially in young children under five. Before the introduction of the Hib vaccine, it was one of the leading causes of bacterial meningitis and pneumonia in children.',
      "Meningitis: A life-threatening infection of the brain and spinal cord's protective membranes.",
      'Pneumonia: A severe lung infection.',
      'Other Infections: Includes bloodstream infections (sepsis), epiglottitis (severe throat swelling), and arthritis caused by the bacterium.',
      'The vaccine is part of routine immunization schedules worldwide and has significantly reduced Hib-related diseases.    ',
      ],
    benefits: [
      'Prevents Severe Diseases: Protects children from meningitis, pneumonia, and other serious infections caused by Hib.',
      'Reduces Complications: Prevents long-term complications such as hearing loss, brain damage, and developmental delays caused by meningitis.',
      'Community Immunity: Reduces the spread of Hib in the population, protecting those who are not vaccinated.',
      'Global Impact: A critical component of child immunization programs worldwide, significantly reducing child mortality.',
    ],
    consequences: [
      'Meningitis:',
      'Life-threatening brain infections causing seizures, brain damage, or death.',
      'Pneumonia:',
      'Severe lung infections leading to respiratory failure.',
      'Sepsis:',
      'Bacteria entering the bloodstream can cause widespread organ damage.',
      'Epiglottitis:',
      'Severe throat swelling that can block airways and lead to suffocation.',
      'Without vaccination, children are at a high risk of severe, life-threatening bacterial infections.            ',
    ],
    image: require('../../assets/images/hepatitis-b.jpg'),
    age: '14 Weeks',
        type: 'Conjugate vaccine (a combination of bacterial sugar molecules and a carrier protein to enhance immunity).',
    modeOfAdministration: 'Intramuscular injection.',
  },
  '18': {
    name: 'PCV (Pneumococcal Conjugate Vaccine) Third does',
    description: [
      'The PCV (Pneumococcal Conjugate Vaccine) protects against infections caused by Streptococcus pneumoniae, also known as pneumococcus. This bacterium is responsible for severe illnesses such as pneumonia, meningitis, and bloodstream infections, particularly in young children, older adults, and individuals with weakened immune systems.',
      'The vaccine works by targeting specific pneumococcal serotypes (strains) most commonly associated with severe disease. It is a critical component of routine immunization schedules worldwide and has significantly reduced pneumococcal-related diseases.',
    ],
    benefits: [
      'Prevents Severe Illnesses: Reduces the risk of life-threatening conditions such as pneumonia, meningitis, and bloodstream infections.',
      'Protects Vulnerable Groups: Particularly effective for young children, the elderly, and those with weakened immune systems.',
      'Decreases Antibiotic Resistance: Reduces the need for antibiotics, helping to combat the growing issue of antibiotic-resistant pneumococcal strains.',
      'Community Immunity: Widespread vaccination reduces the spread of pneumococcus, protecting unvaccinated individuals.',
      'Global Impact: Has significantly lowered child mortality rates and the overall burden of pneumococcal diseases worldwide.',
],
    consequences: [
      'Pneumonia:',
      'A severe lung infection that can lead to respiratory failure or death.',
      'Meningitis:',
      'Brain infection causing seizures, brain damage, or death.',
      'Sepsis:',
      'Bacteria entering the bloodstream can cause organ failure and death.',
      'Otitis Media:',
      'Chronic ear infections leading to hearing loss.',
      'Unvaccinated individuals, especially young children and high-risk groups, are at a greater risk of severe illness and complications.',
    ],
    image: require('../../assets/images/pcv.jpg'),
    age: '14 Weeks',
        type: "Conjugate vaccine (contains pieces of the pneumococcal bacteria's outer coating attached to a carrier protein to enhance immunity).",
    modeOfAdministration: 'Intramuscular injection',
  },
  '19': {
    name: 'Yellow Fever Vaccine',
    description: [
      'The Yellow Fever Vaccine protects against yellow fever, a viral disease transmitted by infected mosquitoes (Aedes or Haemagogus species). The disease is prevalent in parts of Africa and South America and can cause severe symptoms, including high fever, jaundice (yellowing of the skin and eyes), and even death.',
      'This vaccine is vital for preventing yellow fever outbreaks and is often required for international travel to and from endemic areas. It provides long-lasting immunity, often lifelong, with a single dose.',

    ],
    benefits: [
      'Prevents Severe Disease: Protects against life-threatening yellow fever symptoms, including organ failure and death.',
      'Travel Requirement: The vaccine is often mandatory for travelers to yellow fever-endemic areas, with an internationally recognized Yellow Card issued as proof.',
      'Global Control: Helps prevent yellow fever outbreaks and protects against international spread.',
      'Lifelong Protection: A single dose provides immunity for most individuals, eliminating the need for boosters in most cases.',
    ],
    consequences: [
      'Increased Risk of Severe Disease:',
      'Fever, jaundice, and bleeding can lead to death in severe cases.',
      'Higher Mortality Rates:',
      'Up to 50% of severe yellow fever cases result in death without proper medical care.',
      'Outbreak Risk:',
      'Unvaccinated populations in endemic regions are at greater risk of outbreaks.',
      
    ],
    image: require('../../assets/images/yello-feve.jpg'),
    age: '9 Months',
        type: 'Live attenuated vaccine (contains a weakened form of the yellow fever virus that cannot cause the disease but stimulates an immune response).',
    modeOfAdministration: 'Subcutaneous injection.',
  },
  '20': {
    name: 'Measles Vaccine (First Dose)',
    description: [
      'The Measles Vaccine protects against measles, a highly contagious viral disease that primarily affects children. Measles can lead to severe complications such as pneumonia, encephalitis (brain swelling), and even death. The first dose of the vaccine is part of the routine immunization schedule and is critical for providing immunity early in life.',
      'The vaccine is often combined with other vaccines, such as mumps and rubella (MMR), to provide broader protection in a single shot.',
    ],
    benefits: [
      'Prevents Severe Disease: Protects against measles and its complications, including pneumonia, encephalitis, and death.',
      'Herd Immunity: Reduces measles transmission in the community, protecting unvaccinated individuals.',
      'Global Impact: Contributes to efforts to eliminate measles worldwide.',
    ],
    consequences: [
      'Increased Risk of Measles:',
      'Measles can cause severe symptoms, including high fever, rash, and complications.',
      'Higher Morbidity and Mortality:',
      'Complications such as blindness, hearing loss, and brain damage are more common without vaccination.',
      'Community Outbreaks:',
      'Unvaccinated individuals can spread the virus, leading to outbreaks in communities.',
    ],
    image: require('../../assets/images/measles.jpg'),
    age: '9 Months',
        type: 'Live Attenuated Vaccine',
    modeOfAdministration: 'Subcutaneous injection.',
  },
  '21': {
    name: 'Meningitis C Conjugate Vaccine',
    description: [
      'The Meningitis C Conjugate Vaccine provides protection against meningitis caused by the Neisseria meningitidis serogroup C bacterium, a leading cause of bacterial meningitis. Meningitis is an inflammation of the membranes surrounding the brain and spinal cord, which can be life-threatening if untreated. The vaccine is essential in preventing severe infections and reducing the spread of meningitis within communities.',
      'This vaccine is often part of routine immunization schedules and is highly effective in young children, adolescents, and high-risk groups.',

      
    ],
    benefits: [
      'Prevents Meningitis: Protects against a severe and potentially fatal bacterial infection.',
      'Reduces Risk of Septicemia: Prevents complications like blood poisoning caused by Neisseria meningitidis.',
      'Community Protection: Helps reduce bacterial transmission through herd immunity.',
    ],
    consequences: [
      'Increased Risk of Meningitis C:',
      'Can cause high fever, severe headaches, and neck stiffness.',
      'Severe Complications:',
      'May lead to permanent disabilities such as brain damage, hearing loss, or limb amputation.',
      'Higher Mortality Rates:',
      'Meningitis caused by Neisseria meningitidis can be life-threatening without prompt treatment.      ',
    ],
    image: require('../../assets/images/meningitis.jpg'),
    age: '15 Months',
        type: 'Conjugate vaccine (a combination of a weak antigen and a strong carrier protein to enhance the immune response).',
    modeOfAdministration: 'Intramuscular injection.',
  },
  '22': {
    name: 'Measles Vaccine (Second Dose)',
    description: [
      'The Measles Vaccine (Second Dose) is a critical part of the immunization schedule designed to ensure long-term immunity against measles. Measles is a highly contagious viral disease that can lead to severe complications such as pneumonia, encephalitis (brain inflammation), and even death. The first dose of the measles vaccine primes the immune system, while the second dose boosts immunity to nearly 100%, ensuring the best possible protection.',
      'This dose is typically administered as part of the Measles-Mumps-Rubella (MMR) vaccine in many immunization programs.      ',
    ],
    benefits: [
      'Enhanced Protection: Strengthens immunity established by the first dose, ensuring lifelong protection against measles.',
      'Prevents Outbreaks: Reduces the risk of measles outbreaks by achieving herd immunity.',
      'Protects Against Complications: Prevents severe outcomes like pneumonia, brain damage, and blindness associated with measles.',
      'Part of Global Eradication Efforts: Plays a vital role in the WHO’s goal to eliminate measles worldwide.',

    ],
    consequences: [
      'Increased Risk of Measles Infection:',
      'Measles spreads rapidly, particularly in unvaccinated populations.',
      'Severe Health Complications:',
      'Pneumonia, encephalitis, severe diarrhea, and malnutrition.',
      'Higher Mortality Rates:',
      'Measles remains a leading cause of death in unvaccinated children worldwide.',
    ],
    image: require('../../assets/images/measles.jpg'),
    age: '18 Months',
        type: 'Live Attenuated Vaccine',
    modeOfAdministration: 'Subcutaneous injection.',
  },
  '23': {
    name: 'DTP (Booster)',
    description: [
      'The DTP Booster Dose is an essential part of the immunization schedule, providing long-term protection against diphtheria, tetanus, and pertussis (whooping cough). This booster is administered after the initial series of DTP vaccinations to maintain immunity as protection from earlier doses wanes over time. It is crucial for sustaining immunity in growing children and ensuring community-wide protection against these potentially life-threatening bacterial diseases.',
    ],
    benefits: [
      'Sustained Immunity: Maintains protection against diphtheria, tetanus, and pertussis.',
      'Prevents Severe Complications: Reduces the risk of life-threatening complications such as:',
      'Breathing obstruction (diphtheria).',
      'Muscle spasms leading to lockjaw (tetanus).',
      'Pneumonia and brain damage (pertussis).',
      'Herd Immunity: Boosters help reduce disease transmission, protecting unvaccinated individuals.      ',
    ],
    consequences: [
      'Reduced Immunity: Immunity from earlier doses may wane, increasing susceptibility to these diseases.',
      'Higher Risk of Severe Disease: Unvaccinated individuals are at higher risk of serious complications such as:',
      'Tetanus-related muscle paralysis.',
      'Diphtheria-induced airway blockages.',
      'Pertussis-triggered pneumonia or brain damage.',
      'Community Impact: Lack of booster coverage can lead to outbreaks, putting vulnerable populations (infants and elderly) at greater risk.',
    ],
    image: require('../../assets/images/dtp-6.jpg'),
    age: '2 Years',
        type: 'Combination vaccine with inactivated diphtheria and tetanus toxoids and an acellular or whole-cell pertussis component.',
    modeOfAdministration: 'Intramuscular injection.',
  },
  '24': {
    name: 'Hib (Booster)',
    description: [
      'The Hib Booster Dose is administered to reinforce immunity against Haemophilus influenzae type b (Hib), a bacterium that can cause life-threatening illnesses, particularly in children under five years old. These illnesses include meningitis, pneumonia, epiglottitis, and bloodstream infections (sepsis). The booster dose is crucial to ensure long-term protection as the immunity provided by the initial doses may decline over time.',
      'Hib diseases are highly preventable through vaccination, and the booster plays a pivotal role in maintaining herd immunity and individual protection.      ',
    ],
    benefits: [
      'Long-Term Protection: Extends immunity provided by the primary series, ensuring protection during a critical developmental period.',
      'Prevents Severe Illnesses: Protects against:',
      'Meningitis: A life-threatening brain and spinal cord infection that can cause lasting complications like hearing loss or developmental delays.',
      'Pneumonia: A serious lung infection.',
      'Epiglottitis: Swelling of the epiglottis that can block the airway.',
      'Sepsis: A severe bloodstream infection.',
      'Herd Immunity: Reduces disease transmission, protecting unvaccinated individuals and vulnerable populations.',
      
    ],
    consequences: [
      'Increased Risk of Severe Disease:',
      'Higher likelihood of contracting Hib-related illnesses, especially meningitis and pneumonia.',
      'Serious Complications:',
      'Permanent disability (e.g., hearing loss or brain damage) from meningitis.',
      'Death in severe cases of Hib infections.',
      'Community Impact:',
      'Greater risk of outbreaks, endangering infants and those with weakened immune systems.',
    ],
    image: require('../../assets/images/hib.jpg'),
    age: '2 Years',
        type: 'Conjugate vaccine.',
    modeOfAdministration: 'Intramuscular injection.',
  },
  '25': {
    name: 'PCV (Booster)',
    description: [
      'The PCV Booster Dose is administered to reinforce protection against Streptococcus pneumoniae, a bacterium that causes serious illnesses such as pneumonia, meningitis, sepsis, and middle ear infections (otitis media). While the primary doses of the Pneumococcal Conjugate Vaccine (PCV) provide significant initial immunity, the booster dose ensures long-term protection by stimulating the immune system again.',
      'This vaccine is particularly crucial for young children, who are most vulnerable to pneumococcal diseases. The booster dose also helps maintain herd immunity, reducing disease transmission within communities',
    ],
    benefits: [
      'Prevents Pneumococcal Diseases: The booster dose is highly effective in preventing potentially severe conditions like pneumonia, meningitis, and sepsis, which can be life-threatening, especially in young children.',
      'Reduces Complications: It prevents the long-term effects of pneumococcal infections, including hearing loss, brain damage, or death from meningitis.',
      'Enhances Herd Immunity: The booster dose helps to protect the broader community by reducing the transmission of pneumococcal bacteria.      ',
    ],
    consequences: [
      'Increased Risk of Pneumococcal Infections: Children who miss the booster dose may be at higher risk of developing severe infections caused by pneumococcus.',
      'Long-Term Complications: Pneumococcal infections can lead to severe complications like brain damage or hearing loss.',
      'Higher Mortality Risk: Pneumococcal infections can be life-threatening, especially in infants and young children.',
    ],
    image: require('../../assets/images/pcv.jpg'),
    age: '2 Years',
        type: 'Live Attenuated Vaccine',
    modeOfAdministration: 'Intramuscular injection.',
  },
};


export default function VaccineDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const vaccine = vaccineDetails[id];
  const router = useRouter();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {vaccine ? (
        <>
          <Text style={styles.title}>{vaccine.name}</Text>
          {/* <Image source={{ uri: vaccine.image }} style={styles.image} /> */}

          <Image source={vaccine.image} style={styles.image} /> 
          {/* <Image source={{ uri: vaccine.image }} style={styles.image} /> */}
          <Text style={styles.subheading}>Vaccine Type:</Text>
          <Text style={styles.typeText}>{vaccine.type}</Text>
          <Text style={styles.subheading}>Mode Of Administration:</Text>
          <Text style={styles.typeText}>{vaccine.modeOfAdministration}</Text>
          <Text style={styles.subheading}>Description:</Text>
          {vaccine.description.map((description, index) => (
            <Text key={index} style={styles.benefitText}> {description}</Text>
          ))}
          {/* <Text style={styles.subheading}>Description:</Text>
          <Text style={styles.description}>{vaccine.description}</Text> */}
          <Text style={styles.subheading}>Benefits:</Text>
          {vaccine.benefits.map((benefit, index) => (
            <Text key={index} style={styles.benefitText}>• {benefit}</Text>
          ))}
          <Text style={styles.subheading}>Consequences of Not Vaccinating:</Text>
          {vaccine.consequences.map((consequence, index) => (
            <Text key={index} style={styles.consequenceText}>• {consequence}</Text>
          ))}
          <Text style={styles.ageText}>Recommended Age: {vaccine.age}</Text>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
        </>
      ) : (
        <Text style={styles.errorText}>Vaccine not found</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#0B2F9F',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 16,
  },
  typeText:{
    fontSize: 16,
    marginLeft: 10,
    color: '#000',
    marginBottom: 20
  },
  description: {
    fontSize: 16,
    marginBottom: 16,
    color: '#000',
  },
  subheading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#4379F2',
  },
  benefitText: {
    fontSize: 16,
    marginLeft: 10,
    color: '#000',
  },
  consequenceText: {
    fontSize: 16,
    marginLeft: 10,
    color: '#0b309f9b', 
  },
  ageText: {
    fontSize: 16,
    marginTop: 16,
    color: '#000',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
  backButton: {
    marginTop: 20,
    marginBottom: 16,
    padding: 10,
    backgroundColor: '#4379F2',
    borderRadius: 5,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});
