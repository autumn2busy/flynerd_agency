import pandas as pd

data = [
    ["HVAC", 4, 5, 4, 5, 3, 4, 4, 4, 4, 5],
    ["Roofing", 5, 4, 3, 4, 4, 4, 5, 4, 3, 5],
    ["Water Restoration", 5, 5, 3, 5, 4, 5, 5, 3, 4, 5],
    ["Plumbing", 4, 5, 4, 5, 3, 4, 4, 4, 4, 4],
    ["Pest Control", 3, 3, 5, 4, 3, 3, 3, 4, 4, 3],
    ["Garage Door Repair", 3, 5, 4, 5, 3, 4, 3, 5, 5, 4],
    ["Moving Companies", 3, 3, 4, 3, 3, 3, 3, 5, 3, 3],
    ["Med spas", 4, 2, 5, 3, 4, 4, 5, 3, 4, 4],
    ["Cosmetic Dentists", 5, 2, 4, 3, 5, 4, 5, 2, 2, 5],
    ["Implant Dentists", 5, 1, 4, 2, 5, 5, 5, 2, 2, 5],
    ["Personal Injury Law", 5, 4, 3, 5, 4, 4, 5, 2, 3, 5],
    ["Estate Planning Law", 4, 2, 5, 3, 4, 4, 5, 3, 4, 4],
    ["Senior Home Care", 5, 3, 5, 5, 5, 4, 5, 2, 3, 5],
    ["Real Estate Teams", 5, 3, 4, 4, 4, 5, 4, 4, 3, 4],
    ["Home Remodelers", 5, 2, 4, 3, 5, 4, 5, 4, 2, 5],
    ["Kitchen/Bath Remod", 5, 2, 4, 3, 5, 4, 5, 4, 2, 5],
    ["Private Security", 4, 4, 3, 4, 4, 4, 4, 3, 3, 4],
    ["Field Service Firms", 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
    ["Home Inspectors", 2, 4, 3, 2, 2, 3, 2, 5, 3, 2],
    ["Appraisers", 2, 4, 3, 2, 2, 3, 2, 4, 2, 2]
]

columns = ["Niche", "LeadValue", "Urgency", "FAQRep", "AHDemand", "IntakeFric", "FollowUpWk", "Budget", "Compliance", "EasyToSell", "ROI"]
df = pd.DataFrame(data, columns=columns)

df["OpportunityScore"] = df[["LeadValue", "Urgency", "FAQRep", "AHDemand", "IntakeFric", "FollowUpWk", "Budget", "Compliance"]].sum(axis=1)
df["WRL"] = (df["LeadValue"] + df["Urgency"] + df["IntakeFric"] + df["FollowUpWk"] + df["AHDemand"]) * 2
df["FinalPriorityScore"] = df["OpportunityScore"] + df["WRL"] + df["EasyToSell"] + df["ROI"]

df_sorted = df.sort_values(by="FinalPriorityScore", ascending=False)
print(df_sorted[["Niche", "OpportunityScore", "WRL", "FinalPriorityScore"]].to_csv(index=False))
