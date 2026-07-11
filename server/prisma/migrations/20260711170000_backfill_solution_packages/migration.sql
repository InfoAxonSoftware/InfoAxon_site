-- Backfill editable content for the four existing non-ERP solutions.
INSERT INTO "SolutionKeyFeature" ("id","solutionId","number","title","description","enabled","displayOrder","createdAt","updatedAt")
SELECT v.id,s.id,v.number,v.title,v.description,true,v.ord,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP
FROM (VALUES
 ('kf-crm-1','custom-crm','01','Lead & Customer Management','Keep customer profiles, conversations, opportunities, and follow-ups organised.',1),
 ('kf-crm-2','custom-crm','02','Sales Pipeline','Track every opportunity from first contact through quotation and closing.',2),
 ('kf-crm-3','custom-crm','03','Distribution Workflow','Coordinate orders, stock allocation, delivery status, and customer updates.',3),
 ('kf-crm-4','custom-crm','04','Reports & Automation','Use dashboards, reminders, and automated actions to improve team performance.',4),
 ('kf-web-1','ecommerce','01','Responsive Experience','Deliver a polished experience across mobile, tablet, and desktop devices.',1),
 ('kf-web-2','ecommerce','02','Content Management','Update pages, services, articles, and media without developer assistance.',2),
 ('kf-web-3','ecommerce','03','SEO & Analytics','Improve search visibility and measure traffic, engagement, and conversions.',3),
 ('kf-web-4','ecommerce','04','Commerce & Integrations','Connect payments, catalogues, forms, CRM tools, and business workflows.',4),
 ('kf-mobile-1','mobile-apps','01','Cross-platform Delivery','Launch consistent Android and iOS experiences from a maintainable product foundation.',1),
 ('kf-mobile-2','mobile-apps','02','Secure User Accounts','Support authentication, profiles, permissions, and protected customer data.',2),
 ('kf-mobile-3','mobile-apps','03','Notifications & Offline Use','Keep users engaged and provide reliable access when connectivity is limited.',3),
 ('kf-mobile-4','mobile-apps','04','Store Deployment','Prepare, test, and publish releases for Google Play and the Apple App Store.',4),
 ('kf-custom-1','bespoke-software','01','Tailored Workflows','Model the exact processes, approvals, and business rules your organisation needs.',1),
 ('kf-custom-2','bespoke-software','02','Connected Modules','Bring operations, reporting, documents, and communication into one platform.',2),
 ('kf-custom-3','bespoke-software','03','Roles & Security','Control access with clear roles, permissions, audit trails, and secure data handling.',3),
 ('kf-custom-4','bespoke-software','04','Scalable Architecture','Start with priority modules and expand the platform as requirements grow.',4)
) AS v(id,slug,number,title,description,ord)
JOIN "Solution" s ON s.slug=v.slug
WHERE NOT EXISTS (SELECT 1 FROM "SolutionKeyFeature" k WHERE k."solutionId"=s.id);

INSERT INTO "SoftwarePackage" ("id","solutionId","name","slug","startingPrice","suitableFor","summary","supportPeriod","licenceNote","mostPopular","enabled","displayOrder","createdAt","updatedAt")
SELECT v.id,s.id,v.name,v.package_slug,v.price,v.suitable,v.summary,v.support,v.note,v.popular,true,v.ord,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP
FROM (VALUES
 ('pkg-crm-starter','custom-crm','CRM Starter','custom-crm-starter',100000,'Small sales teams','Essential customer, lead, and pipeline management.','30 days corrective support',NULL,false,1),
 ('pkg-crm-professional','custom-crm','CRM Professional','custom-crm-professional',300000,'Growing sales and distribution teams','Automation, dashboards, integrations, and advanced team workflows.','90 days corrective support',NULL,true,2),
 ('pkg-crm-enterprise','custom-crm','CRM Enterprise','custom-crm-enterprise',600000,'Multi-team organisations','Custom CRM and distribution workflows with enterprise integrations.','1 year priority support','Third-party service charges are quoted separately.',false,3),
 ('pkg-web-starter','ecommerce','Website Starter','ecommerce-starter',80000,'Small businesses and new brands','A fast, professional website with essential pages and enquiries.','30 days corrective support',NULL,false,1),
 ('pkg-web-professional','ecommerce','Website Professional','ecommerce-professional',250000,'Growing businesses and online sellers','CMS, commerce, analytics, and a custom conversion-focused experience.','90 days corrective support',NULL,true,2),
 ('pkg-web-enterprise','ecommerce','Website Enterprise','ecommerce-enterprise',500000,'Large catalogues and integrated businesses','Advanced commerce, portals, multilingual content, and business integrations.','1 year priority support','Payment gateway and external licence fees are separate.',false,3),
 ('pkg-mobile-starter','mobile-apps','Mobile Starter','mobile-apps-starter',180000,'Single-platform app ideas','A focused Android or iOS application with essential screens and API connectivity.','30 days corrective support',NULL,false,1),
 ('pkg-mobile-professional','mobile-apps','Mobile Professional','mobile-apps-professional',500000,'Customer-facing mobile products','Cross-platform app, custom UX, backend services, and store publishing.','90 days corrective support',NULL,true,2),
 ('pkg-mobile-enterprise','mobile-apps','Mobile Enterprise','mobile-apps-enterprise',900000,'Complex mobile platforms','Advanced real-time features, integrations, security, and scalable infrastructure.','1 year priority support','Store and third-party service fees are separate.',false,3),
 ('pkg-custom-starter','bespoke-software','Custom Starter','bespoke-software-starter',200000,'A focused internal tool','One custom module for a clearly defined workflow and user group.','30 days corrective support',NULL,false,1),
 ('pkg-custom-professional','bespoke-software','Custom Professional','bespoke-software-professional',600000,'Multi-department operations','A multi-module system with dashboards, permissions, and integrations.','90 days corrective support',NULL,true,2),
 ('pkg-custom-enterprise','bespoke-software','Custom Enterprise','bespoke-software-enterprise',1200000,'Business-critical platforms','A scalable custom platform with complex workflows and enterprise architecture.','1 year priority support','Infrastructure and external licence fees are separate.',false,3)
) AS v(id,slug,name,package_slug,price,suitable,summary,support,note,popular,ord)
JOIN "Solution" s ON s.slug=v.slug
ON CONFLICT ("slug") DO NOTHING;

INSERT INTO "PackageFeature" ("id","packageId","text","featured","enabled","displayOrder")
SELECT 'pf-'||p.id||'-'||f.ord,p.id,
 CASE f.ord
  WHEN 1 THEN 'Discovery and requirements workshop'
  WHEN 2 THEN CASE WHEN p.slug LIKE 'custom-crm%' THEN 'Customer, lead and pipeline management' WHEN p.slug LIKE 'ecommerce%' THEN 'Responsive custom design' WHEN p.slug LIKE 'mobile-apps%' THEN 'User-friendly mobile interface' ELSE 'Custom workflow implementation' END
  WHEN 3 THEN CASE WHEN p.slug LIKE 'custom-crm%' THEN 'Activity tracking and reporting' WHEN p.slug LIKE 'ecommerce%' THEN 'Content and enquiry management' WHEN p.slug LIKE 'mobile-apps%' THEN 'Secure API integration' ELSE 'Role-based access control' END
  WHEN 4 THEN 'Testing, deployment, and staff handover'
  WHEN 5 THEN 'Performance and security review'
  ELSE 'Post-launch corrective support'
 END,
 f.ord<=3,true,f.ord
FROM "SoftwarePackage" p CROSS JOIN (VALUES (1),(2),(3),(4),(5),(6)) f(ord)
WHERE p."solutionId" IS NOT NULL AND p.slug NOT LIKE 'erp-%'
AND NOT EXISTS (SELECT 1 FROM "PackageFeature" existing WHERE existing."packageId"=p.id);

INSERT INTO "PackageAddon" ("id","packageId","text","displayOrder")
SELECT 'pa-'||p.id||'-'||a.ord,p.id,a.text,a.ord
FROM "SoftwarePackage" p
CROSS JOIN (VALUES (1,'Additional integration'),(2,'Extended support and maintenance')) a(ord,text)
WHERE p."solutionId" IS NOT NULL AND p.slug NOT LIKE 'erp-%' AND p."displayOrder">1
AND NOT EXISTS (SELECT 1 FROM "PackageAddon" existing WHERE existing."packageId"=p.id);
