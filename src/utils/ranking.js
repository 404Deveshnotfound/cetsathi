import { COLLEGES } from '../data/mockData';

export function calculateDemoRecommendations(profile) {
  const pScore = parseFloat(profile.percentile) || 92.40;
  const userBranches = profile.preferredBranches || [];
  const userRegions = profile.preferredRegions || [];
  const priorityMode = profile.priorityMode || 'Branch first';

  // Fee budget threshold
  let maxFee = 150000;
  if (profile.feeComfort === 'Under ₹75,000') maxFee = 75000;
  else if (profile.feeComfort === '₹75,000–₹1.5 lakh') maxFee = 150000;
  else if (profile.feeComfort === '₹1.5–₹2.5 lakh') maxFee = 250000;
  else if (profile.feeComfort === 'Flexible') maxFee = 999999;

  // Flatten all college-branch pairs
  const candidates = [];

  COLLEGES.forEach(col => {
    col.branches.forEach(br => {
      const isBranchSelected = userBranches.some(b => br.name.toLowerCase().includes(b.toLowerCase()) || b.toLowerCase().includes(br.name.toLowerCase()));
      const isRegionSelected = userRegions.includes(col.region);
      const isFeeFit = col.indicativeFee <= maxFee;

      // Fit label relative to user's percentile
      const diff = br.sampleCutoff - pScore;
      let fitLabel = 'Target';
      if (diff > 0.1) {
        fitLabel = 'Ambitious';
      } else if (diff < -3.0) {
        fitLabel = 'Safer option';
      } else {
        fitLabel = 'Target';
      }

      // Branch match score (0-100)
      let branchScore = isBranchSelected ? 95 : 65;
      if (userBranches[0] && br.name.toLowerCase().includes(userBranches[0].toLowerCase())) {
        branchScore = 98;
      }

      // Cutoff context score (0-100)
      let cutoffScore = 80;
      if (fitLabel === 'Target') cutoffScore = 92;
      else if (fitLabel === 'Safer option') cutoffScore = 95;
      else if (fitLabel === 'Ambitious') cutoffScore = 75;

      // Fee fit score (0-100)
      let feeScore = 80;
      if (col.indicativeFee <= maxFee * 0.7) feeScore = 98;
      else if (col.indicativeFee <= maxFee) feeScore = 90;
      else feeScore = 65;

      // Location fit score (0-100)
      let locationScore = isRegionSelected ? 92 : 60;

      // College preference score (0-100)
      let collegeScore = col.autonomy === 'Autonomous' ? 92 : 82;
      if (col.type === 'Government-aided') collegeScore += 4;

      // Weights based on priority mode
      let wBranch = 0.35;
      let wCutoff = 0.25;
      let wFee = 0.15;
      let wLoc = 0.15;
      let wCol = 0.10;

      if (priorityMode === 'College first') {
        wCol = 0.30;
        wBranch = 0.20;
        wCutoff = 0.20;
        wLoc = 0.15;
        wFee = 0.15;
      } else if (priorityMode === 'Balanced') {
        wBranch = 0.25;
        wCol = 0.20;
        wCutoff = 0.25;
        wFee = 0.15;
        wLoc = 0.15;
      }

      const totalScore = Math.round(
        branchScore * wBranch +
        cutoffScore * wCutoff +
        feeScore * wFee +
        locationScore * wLoc +
        collegeScore * wCol
      );

      // Construct explanation
      let whyAppears = '';
      if (isBranchSelected && isRegionSelected && isFeeFit) {
        whyAppears = `Matches your branch preference (${br.name}), preferred area (${col.region}), and estimated tuition is within your budget.`;
      } else if (isBranchSelected && isRegionSelected) {
        whyAppears = `Strong alignment with branch (${br.name}) and location (${col.region}); tuition slightly exceeds baseline comfort.`;
      } else if (isBranchSelected) {
        whyAppears = `Strong branch focus in ${br.name}. Involves considering ${col.location} as an alternative area.`;
      } else {
        whyAppears = `Offers related curriculum exposure in ${br.name} with competitive cutoff positioning in ${col.location}.`;
      }

      if (fitLabel === 'Ambitious') {
        whyAppears += ` Historical cutoff is ${Math.abs(diff).toFixed(2)} percentile above your score, making it a valuable aspirational choice.`;
      } else if (fitLabel === 'Target') {
        whyAppears += ` Historical cutoff is ${Math.abs(diff).toFixed(2)} percentile close to your score, serving as a well-calibrated target.`;
      } else {
        whyAppears += ` Historical cutoff is ${Math.abs(diff).toFixed(2)} percentile below your score, providing a protective cushion.`;
      }

      let tradeOffs = '';
      if (fitLabel === 'Ambitious') {
        tradeOffs = 'Higher historical cutoff demands treating as an aspirational option. Do not rely exclusively on this choice.';
      } else if (!isRegionSelected) {
        tradeOffs = `Located in ${col.region}, which is outside your initial preferred region selections (${userRegions.join(', ') || 'None'}).`;
      } else if (!isFeeFit) {
        tradeOffs = `Annual tuition of ₹${col.indicativeFee.toLocaleString('en-IN')} is higher than your preferred threshold.`;
      } else if (col.autonomy === 'Non-autonomous') {
        tradeOffs = 'Affiliated non-autonomous syllabus with university exam scheduling.';
      } else {
        tradeOffs = 'Balanced option with steady historical consistency across admission cycles.';
      }

      candidates.push({
        id: `rec-${col.id}-${br.id}`,
        collegeId: col.id,
        collegeName: col.name,
        branch: br.name,
        location: col.location,
        region: col.region,
        type: col.type,
        autonomy: col.autonomy,
        indicativeFee: col.indicativeFee,
        sampleCutoff: br.sampleCutoff,
        sampleRound: br.sampleRound,
        fitLabel,
        whyAppears,
        tradeOffs,
        preferenceMatchScore: totalScore,
        breakdown: {
          branchMatch: branchScore,
          cutoffContext: cutoffScore,
          feeFit: feeScore,
          locationFit: locationScore,
          collegeFit: collegeScore
        }
      });
    });
  });

  // Sort descending by match score
  candidates.sort((a, b) => b.preferenceMatchScore - a.preferenceMatchScore);

  return candidates;
}
