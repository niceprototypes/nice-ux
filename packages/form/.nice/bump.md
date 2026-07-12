[2026-06-02 20:28] minor: Add Form component — stateless form container with token-based field spacing and submit forwarding
[2026-06-21 21:06] patch: Drive gap from a form component token (getFormToken("gap")) instead of the core gap token, overridable per-subtree via --np--form--gap. Rendered output unchanged at defaults
[2026-06-22 00:00] patch: Export getFormToken from package root for consistency with other nice-react-* component packages
[2026-07-04 15:57] major: Remove the gap prop and the Form component token (getFormToken / --np--form--gap). Form applies no spacing of its own — wrap children in a Flex for gaps. FormGapType removed.
